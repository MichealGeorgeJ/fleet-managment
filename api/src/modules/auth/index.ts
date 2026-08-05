import type { Router } from "express";
import { AuthController } from "./auth.controller";
import { SessionRepo } from "./session.repo";
import { AuthRouter } from "./auth.router";
import { AuthService } from "./auth.service";
import { UserRepo } from "../users/user.repo";
import { SessionEventRepo } from "./session-event.repo";
import { UserService } from "../users/user.service";

export function createAuthRoutes(): Router {

    const userRepo = new UserRepo();
    const sessionRepo = new SessionRepo();
    const sessionEventRepo = new SessionEventRepo();

    const userService = new UserService(userRepo);
    
    const authService = new AuthService(userService, sessionRepo, sessionEventRepo);
    const authController = new AuthController(authService);

    return new AuthRouter(authController).getRouter();
}