import express from "express";
import { authenticate } from "../middleware/auth";
import { getUsers, getUser } from "../controllers/user";

const router = express.Router();
router.use(authenticate);
router.get("/", getUsers);
router.get("/specific", getUser);

export default router;
