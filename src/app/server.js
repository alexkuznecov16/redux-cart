import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';

const people = [
	{id: '1', name: 'Alexander', country: 'Latvia'},
	{id: '2', name: 'Emma', country: 'Germany'},
];

const typeDefs = `#graphql

type Person {
  id: ID!
  name: String!
  country: String
}

type Query {
  allPeople: [Person!]
  getUserById(id: ID!): Person
}

type Mutation {
  addPerson(name: String!, country: String): Person!
}
`;

const resolvers = {
	Query: {
		allPeople: () => people,
    getUserById: (parent, args) => {
      const id = args.id;
      return people.find((user) => user.id === id)
    }
	},
	Mutation: {
		addPerson: (_, {name, country}) => {
			const newPerson = {id: String(people.length + 1), name, country};
			people.push(newPerson);
			return newPerson;
		},
	},
};

const server = new ApolloServer({typeDefs, resolvers});
const {url} = await startStandaloneServer(server, {
	listen: {port: 4000},
});

console.log(`Server running at: ${url}`);
