import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import { TFullName, TUser, TUserModel } from "./user.interface";
import config from "../../config";

// schema for full name
const fullNameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "Please provide First Name"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide Last Name"],
  },
});

// schema for user address
const addressSchema = new Schema({
  street: {
    type: String,
    required: [true, "Please provide the user street name"],
  },
  city: {
    type: String,
    required: [true, "Please provide the user city name"],
  },
  country: {
    type: String,
    required: [true, "Please provide the user country name"],
  },
});

// schema for orders
const ordersSchema = new Schema({
  productName: {
    type: String,
    required: [true, "Please provide the product name"],
  },
  price: {
    type: Number,
    required: [true, "Please provide the product price"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide the order quantity"],
  },
});

// Main Schema
const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, "Please provide a user ID"],
    unique: true,
  },

  username: {
    type: String,
    unique: true,
    required: [true, "Please provide a username"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
  },

  fullName: {
    type: fullNameSchema,
    required: [true, "Please provide Name"],
  },

  age: {
    type: Number,
    required: [true, "Please provide the user's age"],
  },

  email: {
    type: String,
    required: [true, "Please provide the user's email"],
    unique: true,
  },

  isActive: {
    type: Boolean,
    required: true,
    default: true,
  },

  hobbies: [
    {
      type: String,
      required: [true, "Please provide at least one hobbie"],
    },
  ],

  address: {
    type: addressSchema,
    required: [true, "Please provide the user address"],
  },

  orders: [ordersSchema],
});

// hash user password
userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// creating static method for checking userId valid or not
userSchema.statics.isUserIdExists = async function (userId) {
  const userFound = await User.findOne({ userId });
  return userFound;
};

const User = model<TUser, TUserModel>("User", userSchema);

export default User;
