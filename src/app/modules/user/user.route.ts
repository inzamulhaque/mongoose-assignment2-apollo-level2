import express, { Router } from "express";
import { createNewUser, getAllUser } from "./user.controller";

const router: Router = express.Router();

router.post("/", createNewUser);

router.get("/", getAllUser);

export const UserRoutes = router;
