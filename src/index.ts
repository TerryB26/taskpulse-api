import express from "express";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import userRoutes from "./routes/user";

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);
app.use("/users", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 ~ Server running on port ${PORT}`));

export default app;
