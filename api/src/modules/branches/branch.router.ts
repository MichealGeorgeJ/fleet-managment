import { BaseRouter } from "../../shared/base/base.router";
import authMiddleware from "../../shared/middlewares/auth.middleware";
import { asyncHandler } from "../../shared/utils/async-handler";
import type { BranchController } from "./branch.controller";
import { validateCreateBranch, validateDeleteBranch, validateGetByIdBranch, validateUpdateBranch } from "./branch.validator";

export class BranchRouter extends BaseRouter {
    constructor(private readonly controller: BranchController) {
        super();
        this.register();
    }

    protected register(): void {
        const c = this.controller;

        this.router.get("/", authMiddleware, asyncHandler(c.getAll.bind(c)));
        this.router.get("/:id", authMiddleware, validateGetByIdBranch, asyncHandler(c.getById.bind(c)));
        this.router.post("/", authMiddleware, validateCreateBranch, asyncHandler(c.create.bind(c)));
        this.router.put("/:id", authMiddleware, validateUpdateBranch, asyncHandler(c.update.bind(c)));
        this.router.delete("/:id", authMiddleware, validateDeleteBranch, asyncHandler(c.delete.bind(c)));
    }
}
