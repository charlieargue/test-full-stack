// ### User Model
// ```
// {
//   "id": "xxx",                  // user ID (must be unique)
//   "name": "backend test",       // user name
//   "dob": "",                    // date of birth
//   "address": "",                // user address
//   "description": "",            // user description
//   "createdAt": ""               // user created date
//   "updatedAt": ""               // user updated date
// }
// ```
const defs = `

 type User {
    id: ID!
    name: String!
    address: String!
    dob: String
    description: String
    createdAt: String!
    updatedAt: String!
 }


 type Query {
     allUsers: [User!]!
     filteredUsers(search: String): [User!]!
 }

 type Mutation {
    
    createUser(
      name: String!,
      address: String!,
    ): User

    editUser(
        id: ID!
        name: String!
        address: String!,
        description: String!,
      ): User
    
    deleteUser(
        id: ID!
      ): User

}
`
module.exports = defs
