import { TOrders, TUser } from "./user.interface";
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
  if ((await User.isUserIdExists(userId)) === null) {
    throw new Error("User ID not exists");
  }

  const result = await User.findOne({ userId }).select(
    "-_id  -password -orders -__v",
  );
  return result;
};

// update user info into DB
const updateUserInfoIntoDB = async (userId: number, newData: TUser) => {
  if ((await User.isUserIdExists(userId)) === null) {
    throw new Error("User ID not exists");
  }

  const password = await User.hashPassword(newData.password);

  const result = await User.findOneAndUpdate(
    { userId },
    { $set: { ...newData, password } },
    { new: true },
  ).select("-_id -password -orders -__v");

  return result;
};

// delete user from DB
const deleteUserFromDB = async (userId: number) => {
  if ((await User.isUserIdExists(userId)) === null) {
    throw new Error("User ID not exists");
  }

  const result = await User.deleteOne({ userId });
  return result;
};

// add order into DB
const addOrderIntoDB = async (userId: number, order: TOrders) => {
  if ((await User.isUserIdExists(userId)) === null) {
    throw new Error("User ID not exists");
  }

  const result = await User.updateOne({ userId }, [
    {
      $set: {
        orders: {
          $concatArrays: ["$orders", [order]],
        },
      },
    },
  ]);

  return result;
};

// get single user orders from DB
const getSignleUserOrdersFromDB = async (userId: number) => {
  if ((await User.isUserIdExists(userId)) === null) {
    throw new Error("User ID not exists");
  }

  const result = await User.findOne({ userId }).select("orders -_id");
  return result;
};

// cost of single user orders
const calOfSingleUserOrders = async (userId: number) => {
  if ((await User.isUserIdExists(userId)) === null) {
    throw new Error("User ID not exists");
  }

  const result = await User.aggregate([
    { $match: { userId } },
    { $unwind: "$orders" },
    {
      $addFields: {
        "orders.totalPrice": {
          $multiply: ["$orders.price", "$orders.quantity"],
        },
      },
    },
    {
      $group: {
        _id: null,
        totalPrice: { $sum: "$orders.totalPrice" },
      },
    },
    {
      $project: {
        _id: 0,
        totalPrice: 1,
      },
    },
  ]);

  return result;
};

export {
  createNewUserIntoDB,
  getAllUserFromDB,
  getUserByUserIdFromDB,
  updateUserInfoIntoDB,
  deleteUserFromDB,
  addOrderIntoDB,
  getSignleUserOrdersFromDB,
  calOfSingleUserOrders,
};
