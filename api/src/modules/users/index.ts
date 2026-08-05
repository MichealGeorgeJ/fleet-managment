import type { Router } from "express";
import { UserRepo } from "./user.repo";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { UserRouter } from "./user.router";


export function createUserRoutes(): Router {

    const userRepo = new UserRepo();
    const userService = new UserService(userRepo);
    const userController = new UserController(userService);

    return new UserRouter(userController).getRouter();
}
