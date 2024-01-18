import { User } from "../../../database/user";

export const usersQueryResolver = async (
  _: any,
  { search }: { search: string },
) => {
  const users = await User.find({
    fullName: { $regex: new RegExp(search, 'i') },
  })
    .sort({ createdAt: -1 })
    .exec();

  const usersNodes = users.map(user => {
    return {
      node: user,
      cursor: user._id,
    };
  });

  return {
    totalCount: usersNodes.length,
    edges: usersNodes,
  };
};