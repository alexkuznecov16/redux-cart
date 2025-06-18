import {gql} from '@apollo/client';

export const GET_COUNTRIES = gql`
	query {
		countries {
			code
			name
			emoji
		}
	}
`;

export const GET_CHARACTERS = gql`
	query GetCharacters {
		characters(page: 1) {
			results {
				id
				name
				image
			}
		}
	}
`;
