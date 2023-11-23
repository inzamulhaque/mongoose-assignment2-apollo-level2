import { TUser } from "./user.interface";
import User from "./user.model";

const createNewUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

export { createNewUserIntoDB };
