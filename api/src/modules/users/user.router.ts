import { BaseRouter } from "../../shared/base/base.router";
import authMiddleware from "../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import type { UserController } from "./user.controller";
import { validateCreateUser, validateUpdateUser } from "./user.validator";

export class UserRouter extends BaseRouter {

    constructor(private readonly controller: UserController) {
        super();
        this.register();
    }

    protected register(): void {
        const c = this.controller;
        this.router.post("/",authMiddleware, validateCreateUser, asyncHandler(c.create.bind(c)));
        this.router.get("/",authMiddleware, asyncHandler(c.getAll.bind(c)));
        this.router.get("/:id",authMiddleware, asyncHandler(c.getById.bind(c)));
        this.router.patch("/:id",authMiddleware, validateUpdateUser, asyncHandler(c.update.bind(c)));
        this.router.delete("/:id",authMiddleware, asyncHandler(c.delete.bind(c)));
    }
}