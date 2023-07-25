import { ApolloServer } from "apollo-server-micro";

import resolvers from "@/api/resolvers";
import typeDefs from "@/api/schema";

import "@/api/connection";

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: "/api/graphql" });
