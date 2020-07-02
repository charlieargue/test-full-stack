require('dotenv').config()
const { ApolloServer, gql } = require('apollo-server')
const defs = require('./graphql/type-defs.graphql')
const resolvers = require('./graphql/resolvers.graphql')
const mongoose = require('mongoose')
const urlDatabase = process.env.MONGODB_URI
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

// graphql tyepdefs & resolvers
const typeDefs = gql(defs)

// connect to DB
console.log('connecting to', urlDatabase)
mongoose.connect(urlDatabase, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
    })



// wire-up and fire-up the server
const server = new ApolloServer({
    typeDefs,
    resolvers,
})
server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})