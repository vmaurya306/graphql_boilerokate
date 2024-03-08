import { UserDetail } from '../../../types/user';
import { chunkEntitiesLookup } from '../../utils/entity';

export const getUsers = async (ids: readonly string[]): Promise<UserDetail[]> => {
    const uniqueIds = [...new Set(ids)].map(String);

    if (uniqueIds.length === 0) return [];

    const entities = await chunkEntitiesLookup(uniqueIds);
    const entityMap = new Map<string, UserDetail>();
    entities.forEach((entity) => entityMap.set(entity?._id, entity));

    return entities as UserDetail[];
};
