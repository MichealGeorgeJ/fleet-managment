import type { Router } from "express";
import { BranchController } from "./branch.controller";
import { BranchRepo } from "./branch.repo";
import { BranchRouter } from "./branch.router";
import { BranchService } from "./branch.service";

export function createBrancheRoutes(): Router {

    const branchRepo = new BranchRepo();
    const branchService = new BranchService(branchRepo);
    const branchController = new BranchController(branchService);

    return new BranchRouter(branchController).getRouter();
}
