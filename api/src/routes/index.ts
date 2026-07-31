import express from "express";
import { createAuthRoutes } from "../modules/auth/index";

export const router = express.Router()

    .use("/auth", createAuthRoutes());