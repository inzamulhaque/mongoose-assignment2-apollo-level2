import { Request, Response } from "express";
import UserValidationSchema from "./user.validation";
import {
  createNewUserIntoDB,
  getAllUserFromDB,
  getUserByUserIdFromDB,
  updateUserInfoIntoDB,
} from "./user.service";
import { TUser } from "./user.interface";

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

export { createNewUser, getAllUser, getUserByUserId, updateUserInfoByUserId };
