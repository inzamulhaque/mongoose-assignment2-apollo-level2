import { Request, Response } from "express";
import UserValidationSchema from "./user.validation";
import { createNewUserIntoDB } from "./user.service";

// create a new user
const createNewUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;

    // zod validation
    const zodParseUser = UserValidationSchema.parse(user);

    // Insert data into the database
    const result = await createNewUserIntoDB(zodParseUser);

    const { password, ...others } = result.toObject();

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

export { createNewUser };
