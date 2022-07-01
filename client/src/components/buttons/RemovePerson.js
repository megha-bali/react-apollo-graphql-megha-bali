import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, GET_PERSONS, REMOVE_PERSON } from "../../queries";
import { filter } from "lodash";

const RemovePerson = (props) => {
  const [removePerson] = useMutation(REMOVE_PERSON, {
    update(cache, { data: { removePerson } }) {
      const { persons } = cache.readQuery({ query: GET_PERSONS });
      cache.writeQuery({
        query: GET_PERSONS,
        data: {
          persons: filter(persons, (c) => c.id !== removePerson.id),
        },
      });
      const { CarsWithPersons } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          CarsWithPersons: filter(
            CarsWithPersons,
            (c) => c.personId !== removePerson.id
          ),
        },
      });
    },
  });
  const handleButtonClick = () => {
    const { id } = props;
    let result = window.confirm(
      "Are you sure you want to remove  this Person?"
    );
    if (result) {
      removePerson({
        variables: {
          id,
        },
      });
    }
  };

  return (
    <DeleteOutlined
      key="delete"
      onClick={handleButtonClick}
      style={{ color: "red" }}
    />
  );
};
export default RemovePerson;
