import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, dueDate, priority } = req.body;
  const userId = req.user!.id;
  const task = await prisma.task.create({
    data: { title, description, dueDate, priority, userId },
  });
  res.status(201).json(task);
};

export const getTasks = async (req: Request, res: Response) => {
  const { status, sortBy } = req.query;
  const tasks = await prisma.task.findMany({
    where: { userId: req.user!.id, ...(status && { status: String(status) }) },
    orderBy: sortBy ? { [String(sortBy)]: "asc" } : undefined,
  });
  res.json(tasks);
};

export const getTask = async (req: Request, res: Response): Promise<void> => {
  const task = await prisma.task.findUnique({ where: { id: +req.params.id } });
  if (!task || task.userId !== req.user!.id) {
    res.status(404).json({ error: "Task not found" });
    return;
  }
  res.json(task);
};

export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, description, dueDate, priority, status, assignedToId } =
    req.body;
  const task = await prisma.task.update({
    where: { id: +req.params.id },
    data: { title, description, dueDate, priority, status, assignedToId },
  });
  res.json(task);
};

export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  await prisma.task.delete({ where: { id: +req.params.id } });
  res.status(204).send();
};
