import express from "express";
import { authenticate } from "../middleware/auth";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task";
import { addTagsToTask } from "../controllers/tag";

const router = express.Router();
router.use(authenticate);
router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/:id/tags", addTagsToTask);

export default router;
