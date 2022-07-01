import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import { GET_CARS, REMOVE_CAR } from "../../queries";
import { filter } from "lodash";

const RemoveCar = (props) => {
  const [removeCar] = useMutation(REMOVE_CAR, {
    update(cache, { data: { removeCar } }) {
      const { CarsWithPersons } = cache.readQuery({ query: GET_CARS });
      cache.writeQuery({
        query: GET_CARS,
        data: {
          CarsWithPersons: filter(
            CarsWithPersons,
            (c) => c.id !== removeCar.id
          ),
        },
      });
    },
  });
  const handleButtonClick = () => {
    const { id } = props;
    let result = window.confirm("Are you sure you want to remove  this Car?");
    if (result) {
      removeCar({
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
export default RemoveCar;
