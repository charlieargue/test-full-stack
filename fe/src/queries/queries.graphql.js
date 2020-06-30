import { gql } from '@apollo/client';

// GRAPHQL queries
export const ALL_USERS = gql`
query {
    allUsers {
        id
        name,
      	dob
    }
}
`
