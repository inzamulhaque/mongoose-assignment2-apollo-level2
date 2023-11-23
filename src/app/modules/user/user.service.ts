import { TUser } from "./user.interface";
import User from "./user.model";

const createNewUserIntoDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// get all user from DB
const getAllUserFromDB = async () => {
  //   get data and use projextion for remove unnecessary field
  const result = await User.find(
    {},
    {
      _id: 0,
      userId: 0,
      password: 0,
      "fullName._id": 0,
      "address._id": 0,
      hobbies: 0,
      isActive: 0,
      orders: 0,
      __v: 0,
    },
  );
  return result;
};

// get specific user by userId
const getUserByUserIdFromDB = async (userId: number) => {
  const result = await User.findOne({ userId }).select("-password");
  return result;
};

export { createNewUserIntoDB, getAllUserFromDB, getUserByUserIdFromDB };
