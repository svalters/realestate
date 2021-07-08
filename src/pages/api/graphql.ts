import mongoose from "mongoose"
import { ApolloServer } from "apollo-server-micro"

import resolvers from "@/api/resolvers"
import typeDefs from "@/api/schema"

export const MONGODB_URI =
  process.env.MONGODB_URI ??
  `mongodb://root:example@localhost:27017/scraped?authSource=admin`

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
