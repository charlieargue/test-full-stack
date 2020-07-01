import { gql } from '@apollo/client';

// GRAPHQL queries
export const ALL_USERS = gql`
query {
    allUsers {
        id
        name,
        address,
      	description,
        createdAt
    }
}
`

export const EDIT_USER = gql`
mutation editUser(
    $id: ID!,
    $name: String!,
    $address: String!,
    $description: String!
) {
    editUser(
        id: $id,
        name: $name,
        address: $address,
        description: $description,
    ) {
        id
        name
        address
        createdAt
        updatedAt
    }

}
`
