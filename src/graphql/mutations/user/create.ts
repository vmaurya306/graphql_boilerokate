import { User } from "../../../database/user";
import { CreateUserInput } from "../../../types/user";
import { dataLoaders } from "../../resolver/dataloaders";

/**
  * Creates a new user and associates them with a login.
  *
  * @param _ - Unused parameter.
  * @param input - Input data to create a user.
  * @returns The created user.
 */
 export const createUserMutation = async (
   _: null,
   { input }: { input: CreateUserInput }
 ) => {
    const newUser = await User.create({
        ...input,
      });
  
      const savedUser = await newUser.save();
    return await dataLoaders.userLoader.load(savedUser._id);
 };


