import { User } from "../../database/user";
import { UserDetail } from "../../types/user";
const POSTGRES_PARAM_LIMIT = 2000;

export const chunkEntitiesLookup = async (ids: string[]): Promise<UserDetail[]> => {
    const entities: UserDetail[] = [];
  
    if (ids.length === 0) {
      return entities;
    }
  
    const chunks: string[][] = [];
  
    for (let i = 0; i < ids.length; i += POSTGRES_PARAM_LIMIT) {
      chunks.push(ids.slice(i, i + POSTGRES_PARAM_LIMIT));
    }
  
      const chunkPromises = chunks.map(async (chunk) => {
        const entityGroup = await User.find({ _id: { $in: chunk } }).exec();
        return entityGroup;
      });
  
      const chunkResults = await Promise.all(chunkPromises);
      entities.push(...chunkResults.flat());
  
    return entities;
  };
