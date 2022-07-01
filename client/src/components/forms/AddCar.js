import { useQuery, useMutation } from "@apollo/client";

import { Form, Input, Button, Select } from "antd";

import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_CAR, GET_CARS, GET_PERSONS } from "../../queries";

const AddCar = () => {
  let [id] = useState(uuidv4);
  const { loading, error, data } = useQuery(GET_PERSONS);

  const [addCar] = useMutation(ADD_CAR);
  const { Option } = Select;

  const onFinish = (values) => {
    const { year, make, model, price, personId } = values;
    const person = data.persons.find((p) => p.id === personId);
    id += new Date().getTime().toString(); //reset is required, else it is using common id for all.
    addCar({
      variables: {
        id,
        year,
        make,
        model,
        price,
        personId,
        person,
      },
      update: (proxy, { data: { addCar } }) => {
        const data = proxy.readQuery({
          query: GET_CARS,
        });
        proxy.writeQuery({
          query: GET_CARS,
          data: {
            ...data,
            CarsWithPersons: [...data.CarsWithPersons, addCar],
          },
        });
      },
    });
    form.resetFields();
  };

  const [form] = Form.useForm();
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);

  const handlePersonChange = (value) => {
    form.setFieldsValue({ personId: value });
  };

  if (loading) return "Loading.....";
  if (error) return `Error! ${error.message}`;
  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      name="add-car-form"
      layout="inline"
      size="large"
      onFinish={onFinish}
    >
      <Form.Item
        name="year"
        rules={[{ required: true, message: "Please input your year!" }]}
      >
        <Input placeholder="i.e. 2022" />
      </Form.Item>
      <Form.Item
        name="make"
        rules={[{ required: true, message: "Please input your make!" }]}
      >
        <Input placeholder="i.e. Honda" />
      </Form.Item>
      <Form.Item
        name="model"
        rules={[{ required: true, message: "Please input your model!" }]}
      >
        <Input placeholder="i.e. CRV" />
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{ required: true, message: "Please input your price!" }]}
      >
        <Input placeholder="i.e. 38000" />
      </Form.Item>

      <Form.Item
        name="personId"
        rules={[{ required: true, message: "Please input your personId!" }]}
      >
        <Select
          placeholder="Select Person"
          style={{ width: "205px" }}
          onChange={handlePersonChange}
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
          <Button
            type="primary"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              form.getFieldsError().filter(({ errors }) => errors.length).length
            }
          >
            Add Car
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddCar;
