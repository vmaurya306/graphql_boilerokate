import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typedefs";
import { resolvers } from "../resolver";

export const server = new ApolloServer ({
    typeDefs,
    resolvers,
    introspection: true,
  });