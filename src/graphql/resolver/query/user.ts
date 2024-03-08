import { User } from '../../../database/user';

export const usersQueryResolver = async (_: any, { search }: { search: string }) => {
    const users = await User.find({
        fullName: { $regex: new RegExp(search, 'i') },
    })
        .sort({ createdAt: -1 })
        .limit(10)
        .skip(0);

    const count = await User.countDocuments({
        fullName: { $regex: new RegExp(search, 'i') },
    });
    const usersNodes = users.map((user) => {
        return {
            node: user,
            cursor: user._id,
        };
    });

    return {
        totalCount: count,
        edges: usersNodes,
    };
};
