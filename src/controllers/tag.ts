import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addTagsToTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { tags } = req.body;
  const taskId = +req.params.id;

  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task || task.userId !== req.user!.id) {
    res.status(404).json({ error: "Task not found" });
    return;
  }

  for (const tagName of tags) {
    const tag = await prisma.tag.upsert({
      where: { name: tagName },
      update: {},
      create: { name: tagName },
    });
    await prisma.taskTag.create({
      data: { taskId, tagId: tag.id },
    });
  }

  res.json({ message: "Tags added" });
  return;
};
