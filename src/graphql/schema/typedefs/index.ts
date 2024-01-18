import { connections } from "./connection/connections";
import { edges } from "./edge/edges";
import { inputTypes } from "./inputs";
import { root } from "./root";
import { schemaTypes } from "./types";

export const typeDefs = [...inputTypes,...schemaTypes,root, connections, edges];
