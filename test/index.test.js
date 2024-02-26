import request from "supertest";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import your app
import app from "../src/index.js";

describe("Test routes", () => {
  it("should display home page on GET /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain("home.html");
  });

  it("should redirect to home page on GET /user/ if no cookie", async () => {
    const res = await request(app).get("/user/");
    expect(res.statusCode).toEqual(302);
    expect(res.headers.location).toBe("/");
  });

  it("should return 400 on POST /api/signup/ if no body", async () => {
    const res = await request(app).post("/api/signup/");
    expect(res.statusCode).toEqual(400);
  });

  it("should return 400 on POST /api/login/ if no body", async () => {
    const res = await request(app).post("/api/login/");
    expect(res.statusCode).toEqual(400);
  });

  it("should return 400 on GET /api/transactions/ if no cookie", async () => {
    const res = await request(app).get("/api/transactions/");
    expect(res.statusCode).toEqual(400);
  });

  it("should return 400 on POST /api/transaction if no body", async () => {
    const res = await request(app).post("/api/transaction");
    expect(res.statusCode).toEqual(400);
  });

  it("should return 400 on DELETE /api/transactions/:year/:id if no cookie", async () => {
    const res = await request(app).delete("/api/transactions/2022/123");
    expect(res.statusCode).toEqual(400);
  });
});
