import express from "express";
import { createAuthRoutes } from "../modules/auth/index";
import { swaggerUI } from "../core/swagger/openapi";
import { createUserRoutes } from "../modules/users";
import { createBrancheRoutes } from "../modules/branches";

export const router = express.Router()

    .use("/docs", swaggerUI())
    .use("/auth", createAuthRoutes())
    .use("/users", createUserRoutes())
    .use("/branches", createBrancheRoutes())