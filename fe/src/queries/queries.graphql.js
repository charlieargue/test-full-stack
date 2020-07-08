import { gql } from '@apollo/client';

// fragments
const fragUserResult = gql`
    fragment userResult on User {
        id
        name
        address
        description
        createdAt
    } 
`

// GRAPHQL queries
export const ALL_USERS = gql`
query {
    allUsers {
        ...userResult
    }
}
${fragUserResult}
`

export const FILTERED_USERS = gql`
query FilteredUsers($search: String, $page: Int) {
    filteredUsers(search: $search, page: $page) {
      ...userResult
    }
  }
${fragUserResult}
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
