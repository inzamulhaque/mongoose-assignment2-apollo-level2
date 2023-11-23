import express, { Router } from "express";
import { createNewUser } from "./user.controller";

const router: Router = express.Router();

router.post("/", createNewUser);

export const UserRoutes = router;
