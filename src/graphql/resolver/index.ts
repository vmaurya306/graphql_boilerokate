import { mutationResolvers } from "../mutations";
import { queryResolvers } from "./query";

export const resolvers = {
    Query: queryResolvers,
    Mutation: mutationResolvers
};
