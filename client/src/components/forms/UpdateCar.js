import { useMutation, useQuery } from "@apollo/client";
import { Button, Form, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { GET_CARS, GET_PERSONS, UPDATE_CAR } from "../../queries";

const UpdateCar = (props) => {
  const [id] = useState(props.id);
  const [year] = useState(props.year);
  const [make] = useState(props.make);
  const [model] = useState(props.model);
  const [price] = useState(props.price);
  const [personId] = useState(props.personId);
  const [person] = useState(props.person);

  const { loading, error, data } = useQuery(GET_PERSONS);

  const [form] = Form.useForm();
  const [updateCar] = useMutation(UPDATE_CAR);
  const [, forceUpdate] = useState([]);
  const { Option } = Select;

  useEffect(() => {
    forceUpdate({});
  }, []);
  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    const person = data.persons.find((p) => p.id === personId);
    updateCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
      },
      update: (proxy, { data: { updateCar } }) => {
        const data = proxy.readQuery({
          query: GET_CARS,
        });
        const updatedData = data.CarsWithPersons.map((c) => {
          if (c.id === updateCar.id) {
            return { ...c, person: person };
          }
          return c;
        });
        proxy.writeQuery({
          query: GET_CARS,
          data: { ...data, CarsWithPersons: updatedData },
        });
      },
    });
    props.onButtonClick();
  };

  const updateStateVariable = (variable, value) => {
    props.updateStateVariable(variable, value);
    if (variable === "personId") {
      props.updateStateVariable(
        "person",
        data.persons.find((p) => p.id === value)
      );
    }
  };

  if (loading) return "Loading.....";
  if (error) return `Error! ${error.message}`;
  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      name="update-car-form"
      layout="inline"
      size="large"
      initialValues={{
        year: year,
        make: make,
        model: model,
        price: price,
        personId: personId,
        person: person,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input year!" }]}
      >
        <Input
          placeholder="i.e. 2022"
          onChange={(e) => updateStateVariable("year", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input make!" }]}
      >
        <Input
          placeholder="i.e. Honda"
          onChange={(e) => updateStateVariable("make", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input model!" }]}
      >
        <Input
          placeholder="i.e. CRV"
          onChange={(e) => updateStateVariable("model", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input price!" }]}
      >
        <Input
          placeholder="i.e. 38000"
          onChange={(e) => updateStateVariable("price", e.target.value)}
        />
      </Form.Item>
      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please input your personId!" }]}
      >
        <Select
          placeholder="Select Person"
          style={{ width: "205px" }}
          onChange={(v) => updateStateVariable("personId", v)}
          allowClear
        >
          {data.persons.map(({ id, firstName, lastName }) => (
            <Option value={id} key={id}>
              {firstName} {lastName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item shouldUpdate={true}>
        {() => (
          <Button type="primary" htmlType="submit">
            Update Car
          </Button>
        )}
      </Form.Item>
      <Button onClick={props.onButtonClick}>Cancel</Button>
    </Form>
  );
};

export default UpdateCar;
