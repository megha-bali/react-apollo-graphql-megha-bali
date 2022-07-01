import { gql } from "apollo-server-express";
import { find, remove, filter } from "lodash";

const persons = [
  {
    id: "1",
    firstName: "Bill",
    lastName: "Gates",
  },
  {
    id: "2",
    firstName: "Steve",
    lastName: "Jobs",
  },
  {
    id: "3",
    firstName: "Linux",
    lastName: "Torvalds",
  },
];

const cars = [
  {
    id: "1",
    year: "2019",
    make: "Toyota",
    model: "Corolla",
    price: "40000",
    personId: "1",
  },
  {
    id: "2",
    year: "2018",
    make: "Lexus",
    model: "LX 600",
    price: "13000",
    personId: "1",
  },
  {
    id: "3",
    year: "2017",
    make: "Honda",
    model: "Civic",
    price: "20000",
    personId: "1",
  },
  {
    id: "4",
    year: "2019",
    make: "Acura ",
    model: "MDX",
    price: "60000",
    personId: "2",
  },
  {
    id: "5",
    year: "2018",
    make: "Ford",
    model: "Focus",
    price: "35000",
    personId: "2",
  },
  {
    id: "6",
    year: "2017",
    make: "Honda",
    model: "Pilot",
    price: "45000",
    personId: "2",
  },
  {
    id: "7",
    year: "2019",
    make: "Volkswagen",
    model: "Golf",
    price: "40000",
    personId: "3",
  },
  {
    id: "8",
    year: "2018",
    make: "Kia",
    model: "Sorento",
    price: "45000",
    personId: "3",
  },
  {
    id: "9",
    year: "2017",
    make: "Volvo",
    model: "XC40",
    price: "55000",
    personId: "3",
  },
];

const typeDefs = gql`
  type Person {
    id: String!
    firstName: String!
    lastName: String!
    cars: [Car]
  }
  type Car {
    id: String
    year: String!
    make: String!
    model: String!
    price: String!
    personId: String!
    person: Person
  }

  type Query {
    person(id: String!): Person
    persons: [Person]
    car(id: String!): Car
    cars: [Car]
    personWithCars(id: String!): Person
    CarsWithPersons: [Car]
  }
  type Mutation {
    addPerson(id: String, firstName: String!, lastName: String!): Person
    updatePerson(id: String, firstName: String!, lastName: String!): Person
    removePerson(id: String!): Person

    addCar(
      id: String
      year: String!
      make: String!
      model: String!
      price: String!
      personId: String!
    ): Car
    updateCar(
      id: String
      year: String!
      make: String!
      model: String!
      price: String!
      personId: String!
    ): Car
    removeCar(id: String!): Car
  }
`;
const resolvers = {
  Query: {
    persons: () => persons,
    person(parent, args, context, info) {
      return find(persons, { id: args.id });
    },
    cars: () => cars,
    car(parent, args, context, info) {
      return find(cars, { id: args.id });
    },
    // personsWithCars(parent, args, context, info) {
    //   persons.forEach(function (p) {
    //     p.cars = filter(cars, { personId: p.id });
    //   });
    //   return persons;
    // },
    CarsWithPersons(parent, args, context, info) {
      cars.forEach(function (c) {
        const p = filter(persons, { id: c.personId });
        c.person =
          p.length > 0
            ? p[0]
            : { id: "_", firstName: "-No Person-", lastName: "" };
      });
      return cars;
    },
    personWithCars(parent, args, context, info) {
      let p = find(persons, { id: args.id });
      p.cars = filter(cars, { personId: p.id });
      return p;
    },
  },
  Mutation: {
    addPerson(root, args) {
      const newPerson = {
        id: args.id,
        firstName: args.firstName,
        lastName: args.lastName,
      };
      persons.push(newPerson);
      return newPerson;
    },
    addCar(root, args) {
      const newCar = {
        id: args.id,
        year: args.year,
        make: args.make,
        model: args.model,
        price: args.price,
        personId: args.personId,
      };
      cars.push(newCar);
      return newCar;
    },
    updatePerson: (root, args) => {
      const person = find(persons, { id: args.id });
      if (!person) throw new Error(`Couldn't find person with id ${args.id}`);

      person.firstName = args.firstName;
      person.lastName = args.lastName;
      return person;
    },
    updateCar: (root, args) => {
      const car = find(cars, { id: args.id });
      if (!car) throw new Error(`Couldn't find car with id ${args.id}`);

      car.make = args.make;
      car.model = args.model;
      car.year = args.year;
      car.price = args.price;
      car.personId = args.personId;
      return car;
    },
    removePerson: (root, args) => {
      const removedPerson = find(persons, { id: args.id });
      if (!removedPerson)
        throw new Error(`Couldn't find person with id ${args.id}`);

      remove(cars, { personId: args.id });
      remove(persons, { id: args.id });
      return removedPerson;
    },
    removeCar: (root, args) => {
      const removedCar = find(cars, { id: args.id });
      if (!removedCar) throw new Error(`Couldn't find car with id ${args.id}`);

      remove(cars, { id: args.id });
      return removedCar;
    },
  },
};

export { typeDefs, resolvers };
