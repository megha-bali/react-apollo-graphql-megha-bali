//import logo from './logo.svg';
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Title from "./components/layouts/Title";

import Persons from "./components/lists/Persons";
import Cars from "./components/lists/Cars";
import AddPerson from "./components/forms/AddPerson";
import AddCar from "./components/forms/AddCar";
import Home from "./Home";
import ShowDetail from "./components/details/ShowDetail";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="App">
        <Title name="People and their cars" header={true} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/:id" element={<ShowDetail />}></Route>
        </Routes>
      </div>
    </Router>
  </ApolloProvider>
);

export default App;
