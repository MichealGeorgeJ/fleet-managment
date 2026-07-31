import type { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthRepo } from "./auth.repo";
import { AuthRouter } from "./auth.router";
import { AuthService } from "./auth.service";

export function createAuthRoutes(): Router {

    const authRepo = new AuthRepo();
    const authService = new AuthService(authRepo);
    const authController = new AuthController(authService);

    return new AuthRouter(authController).getRouter();
}