import { useQuery } from "@apollo/client";
import AddCar from "./components/forms/AddCar";
import AddPerson from "./components/forms/AddPerson";
import Title from "./components/layouts/Title";
import Cars from "./components/lists/Cars";
import Persons from "./components/lists/Persons";
import { GET_PERSONS } from "./queries";

const Home = () => {
  const { loading, error, data } = useQuery(GET_PERSONS);
  if (loading) return "Loading.....";
  if (error) return `Error! ${error.message}`;
  return (
    <div class="hContainer">
      <div class="hc-child">
        <Title name="People" />
        <AddPerson />
        <Persons />
      </div>
      {data.persons.length > 0 ? (
        <div class="hc-child">
          <Title name="Cars" />
          <AddCar />
          <Cars />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Home;
