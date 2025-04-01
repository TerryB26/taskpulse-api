import express from "express";
import { authenticate } from "../middleware/auth";
import { getUsers, getUser } from "../controllers/user";

const router = express.Router();
router.use(authenticate);
router.get("/all", getUsers);
router.get("/", getUser);

export default router;
