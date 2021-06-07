const { ApolloServer, gql } = require('apollo-server')
const schemaMovies = require('./schema/Movie')
const schemaTvSeries = require('./schema/TvSeries')

const typeDefs = gql`
  type Query
  type Mutation
  type successUpdate {
    message: String
  }
`

const server = new ApolloServer({ 
  typeDefs  : [typeDefs, schemaTvSeries.typeDefs, schemaMovies.typeDefs], 
  resolvers : [schemaTvSeries.resolvers, schemaMovies.resolvers]
})

// The `listen` method launches a web server.
server
  .listen()
  .then(({ url }) => console.log(`🚀  Server ready at ${url}`))