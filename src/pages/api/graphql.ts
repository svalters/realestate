import mongoose from "mongoose"
import { ApolloServer } from "apollo-server-micro"

import { MONGODB_URI } from "@/api/constants"
import resolvers from "@/api/resolvers"
import typeDefs from "@/api/schema"

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: "/api/graphql" })
