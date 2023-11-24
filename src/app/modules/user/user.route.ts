import express, { Router } from "express";
import {
  createNewUser,
  getAllUser,
  getUserByUserId,
  updateUserInfoByUserId,
} from "./user.controller";

const router: Router = express.Router();

router.post("/", createNewUser);

router.get("/", getAllUser);

router.get("/:userId", getUserByUserId);

router.put("/:userId", updateUserInfoByUserId);

export const UserRoutes = router;
