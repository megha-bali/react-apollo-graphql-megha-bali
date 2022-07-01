import { useMutation } from "@apollo/client";

import { Form, Input, Button } from "antd";

import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { ADD_PERSON, GET_PERSONS } from "../../queries";

const AddPerson = () => {
  let [id] = useState(uuidv4);
  const [addPerson] = useMutation(ADD_PERSON);

  const onFinish = (values) => {
    const { firstName, lastName } = values;
    id = new Date().getTime().toString(); //reset is required, else it is using common id for all.
    addPerson({
      variables: {
        id,
        firstName,
        lastName,
      },
      update: (proxy, { data: { addPerson } }) => {
        const data = proxy.readQuery({
          query: GET_PERSONS,
        });
        proxy.writeQuery({
          query: GET_PERSONS,
          data: {
            ...data,
            persons: [...data.persons, addPerson],
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

  return (
    <Form
      form={form}
      style={{ marginBottom: "40px" }}
      name="add-person-form"
      layout="inline"
      size="large"
      onFinish={onFinish}
    >
      <Form.Item
        name="firstName"
        rules={[{ required: true, message: "Please input your first name!" }]}
      >
        <Input placeholder="i.e. John" />
      </Form.Item>
      <Form.Item
        name="lastName"
        rules={[{ required: true, message: "Please input your last name!" }]}
      >
        <Input placeholder="i.e. Smith" />
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
            Add Person
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddPerson;
