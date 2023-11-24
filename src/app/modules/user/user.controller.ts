import { Request, Response } from "express";
import UserValidationSchema, {
  OrdersValidationSchema,
} from "./user.validation";
import {
  addOrderIntoDB,
  createNewUserIntoDB,
  getAllUserFromDB,
  getUserByUserIdFromDB,
  updateUserInfoIntoDB,
} from "./user.service";
import { TOrders, TUser } from "./user.interface";

// Create a new user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // zod validation
    const zodParseUser = UserValidationSchema.safeParse(user);

    // handle validation failure
    if (!zodParseUser.success) {
      throw new Error("Please provide correct data");
    }

    // Insert data into the database
    const result = await createNewUserIntoDB(zodParseUser.data as TUser);

    const { password, orders, ...others } = result.toObject();

    res.json({
      success: true,
      message: "User created successfully!",
      data: others,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// Retrieve a list of all users
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await getAllUserFromDB();
    res.json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

// Retrieve a specific user by userId
const getUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    // parse userId and find user from DB
    const result = await getUserByUserIdFromDB(Number(userId));

    res.json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message || "User not found!",
      },
    });
  }
};

// Update user information
const updateUserInfoByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const user = req.body;

    // zod validation
    const zodParseUser = UserValidationSchema.safeParse(user);

    // handle validation failure
    if (!zodParseUser.success) {
      throw new Error("Please provide correct data");
    }

    const result = await updateUserInfoIntoDB(
      Number(userId),
      zodParseUser.data as TUser,
    );

    res.json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (err: any) {
    res.json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message || "User not found!",
      },
    });
  }
};

// Delete a user
const deleteUserByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
  } catch (err: any) {
    res.json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message || "User not found!",
      },
    });
  }
};

// add new orders
const addNewOrders = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const orders = req.body;
    const zodParseOrders = OrdersValidationSchema.safeParse(orders);

    // handle validation failure
    if (!zodParseOrders.success) {
      throw new Error("Please provide correct data");
    }

    const result = await addOrderIntoDB(
      Number(userId),
      zodParseOrders.data as TOrders,
    );

    res.json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err: any) {
    res.json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: err.message || "User not found!",
      },
    });
  }
};

export {
  createNewUser,
  getAllUser,
  getUserByUserId,
  updateUserInfoByUserId,
  deleteUserByUserId,
  addNewOrders,
};
