import { BaseRouter } from "../../shared/base/base.router";
import { asyncHandler } from "../../shared/utils/async-handler";
import type { BranchController } from "./branche.controller";
import { validateCreateBranch, validateDeleteBranch, validateGetByIdBranch, validateUpdateBranch } from "./branche.validator";

export class BranchRouter extends BaseRouter {
    constructor(private readonly controller: BranchController) {
        super();
        this.register();
    }

    protected register(): void {
        const c = this.controller;

        this.router.get("/", asyncHandler(c.getAll.bind(c)));
        this.router.get("/:id", validateGetByIdBranch, asyncHandler(c.getById.bind(c)));
        this.router.post("/", validateCreateBranch, asyncHandler(c.create.bind(c)));
        this.router.put("/:id", validateUpdateBranch, asyncHandler(c.update.bind(c)));
        this.router.delete("/:id", validateDeleteBranch, asyncHandler(c.delete.bind(c)));
    }
}
