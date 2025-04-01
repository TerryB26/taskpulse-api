import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
      },
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { id, email } = req.query;

  if (!id && !email) {
    res.status(400).json({ error: "Please provide either an id or an email" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: id ? { id: Number(id) } : { email: String(email) },
      select: {
        id: true,
        email: true,
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
