import type { Router } from "express";
import { BranchController } from "./branche.controller";
import { BranchRepo } from "./branche.repo";
import { BranchRouter } from "./branche.router";
import { BranchService } from "./branche.service";

export function createBrancheRoutes(): Router {

    const branchRepo = new BranchRepo();
    const branchService = new BranchService(branchRepo);
    const branchController = new BranchController(branchService);

    return new BranchRouter(branchController).getRouter();
}
