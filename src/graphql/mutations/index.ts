import { createUserMutation } from "./user/create";

export const mutationResolvers = {
    createUser: createUserMutation,
};