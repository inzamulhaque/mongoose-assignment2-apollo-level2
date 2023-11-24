import express, { Router } from "express";
import {
  addNewOrders,
  createNewUser,
  deleteUserByUserId,
  getAllUser,
  getUserByUserId,
  updateUserInfoByUserId,
} from "./user.controller";

const router: Router = express.Router();

router.post("/", createNewUser);

router.get("/", getAllUser);

router.get("/:userId", getUserByUserId);

router.put("/:userId", updateUserInfoByUserId);

router.delete("/:userId", deleteUserByUserId);

router.put("/:userId/orders", addNewOrders);

export const UserRoutes = router;
