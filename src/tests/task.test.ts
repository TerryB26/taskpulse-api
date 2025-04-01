import request from "supertest";
import app from "../index";

describe("Task API", () => {
  let token: string;

  beforeAll(async () => {
    await request(app)
      .post("/auth/signup")
      .send({ email: "test@example.com", password: "password123" });
    const res = await request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password123" });
    token = res.body.token;
  });

  it("should create a task", async () => {
    const res = await request(app)
      .post("/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Test" });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe("Test Task");
  });
});
