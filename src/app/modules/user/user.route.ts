import express, { Router } from "express";
import { createNewUser, getAllUser, getUserByUserId } from "./user.controller";

const router: Router = express.Router();

router.post("/", createNewUser);

router.get("/", getAllUser);

router.get("/:userId", getUserByUserId);

export const UserRoutes = router;
