import {ApolloClient, InMemoryCache, HttpLink, split} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';

const countriesLink = new HttpLink({
	uri: 'https://countries.trevorblades.com/',
});

const usersLink = new HttpLink({
	uri: 'https://rickandmortyapi.com/graphql',
});

const link = split(
	({query}) => {
		const definition = getMainDefinition(query);
		return definition.kind === 'OperationDefinition' && ['GetCharacters'].includes(definition.name?.value);
	},
	usersLink,
	countriesLink,
);

const client = new ApolloClient({
	link,
	cache: new InMemoryCache(),
});

export default client;
