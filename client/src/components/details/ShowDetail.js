import { useQuery } from "@apollo/client";
import { Card } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GET_PERSON_WITH_CARS } from "../../queries";

const ShowDetail = () => {
  const [, forceUpdate] = useState();

  useEffect(() => {
    forceUpdate({});
  }, []);
  const getStyles = () => ({
    card: {
      width: "500px",
    },
  });
  const styles = getStyles();
  let { id } = useParams();

  const { loading, error, data } = useQuery(GET_PERSON_WITH_CARS, {
    variables: { id: id },
  });

  return (
    <>
      <h1>ShowDetail</h1>
      {error ? (
        "Error loading data"
      ) : loading ? (
        "Loading"
      ) : (
        <Card
          title={
            data.personWithCars.firstName + " " + data.personWithCars.lastName
          }
          style={styles.card}
        >
          <Card type="inner" title="Cars">
            {data.personWithCars.cars.length === 0
              ? "No Cars"
              : data.personWithCars.cars.map(
                  ({ id, year, make, model, price }) => (
                    <p key={id}>
                      {make} {model} {year} (
                      {"Price: $" +
                        parseInt(price)
                          .toFixed(2)
                          .replace(/\d(?=(\d{3})+\.)/g, "$&,")}{" "}
                      )
                    </p>
                  )
                )}
          </Card>
        </Card>
      )}

      <Link to="/">GO BACK HOME</Link>
    </>
  );
};
export default ShowDetail;
