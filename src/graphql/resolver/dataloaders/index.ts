import DataLoader from "dataloader";
import { getUsers } from "./userLoader";
import { UserDetail } from "../../../types/user";

const cacheProp = { cache: true };
export const dataLoaders = {
  userLoader: new DataLoader<string, UserDetail>(getUsers, cacheProp),
};
