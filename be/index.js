const { ApolloServer, gql } = require('apollo-server')
// const { v1: uuid } = require('uuid')
const defs = require('./graphql/type-defs.graphql')

// --------------
let users = [
    {
        "id": "1",                            // user ID (must be unique)
        "name": "backend test",                 // user name
        "dob": "6/16/44",                       // date of birth
        "address": "237 A St.",                 // user address
        "description": "testing",               // user description
        "createdAt": "2020-07-01",              // user created date
        "updatedAt": "2020-07-01"               // user updated date
    },
    {
        "id": "2",
        "name": "front-end test💎",
        "dob": "5/15/33",
        "address": "444 B St.",
        "description": "testing 💎",
        "createdAt": "2020-07-02",
        "updatedAt": "2020-07-02"
    },
]

// graphql tyepdefs & resolvers
const typeDefs = gql(defs)
const resolvers = {
    Query: {
        allUsers: () => {
            return users
        },
    },
}


// wire-up the server
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

// fire-up the server
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})


