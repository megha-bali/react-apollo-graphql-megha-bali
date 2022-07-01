import { useQuery } from "@apollo/client";
import { GET_CARS } from "../../queries";
import { List } from "antd";
import Car from "../listitems/Car";

const getStyles = () => ({
  list: {
    display: "flex",
    justifyContent: "center",
  },
});

const Cars = () => {
  const styles = getStyles();
  const { loading, error, data } = useQuery(GET_CARS);

  if (loading) return "Loading.....";
  if (error) return `Error! ${error.message}`;
  console.log(data.CarsWithPersons);
  return (
    <div style={styles.list}>
      <List grid={{ gutter: 20, column: 1 }} style={styles.list}>
        {data.CarsWithPersons.map(
          ({ id, year, make, model, price, personId, person }) => (
            <List.Item key={id}>
              <Car
                key={id}
                id={id}
                year={year}
                make={make}
                model={model}
                price={price}
                personId={personId}
                person={person}
              />
            </List.Item>
          )
        )}
      </List>
    </div>
  );
};
export default Cars;
