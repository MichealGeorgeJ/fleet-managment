import { BaseController } from "../../shared/base/base.controller";
import type { Request, Response } from "express";
import type { BranchService } from "./branch.service";

export class BranchController extends BaseController {

    constructor(private readonly branchService: BranchService) {
        super();
    }

    async create(req: Request, res: Response): Promise<void> {
        const branch = await this.branchService.create(req.body)
        return this.response(res).created(branch);
    }

    async update(req: Request, res: Response): Promise<void> {
        const branch = await this.branchService.update(Number(req.params.id), req.body)
        return this.response(res).ok(branch);
    }

    async delete(req: Request, res: Response): Promise<void> {
        await this.branchService.delete(Number(req.params.id))
        return this.response(res).noContent();
    }

    async getById(req: Request, res: Response): Promise<void> {
        const branch = await this.branchService.getById(Number(req.params.id))
        return this.response(res).ok(branch);
    }

    async getAll(req: Request, res: Response): Promise<void> {
        const branch = await this.branchService.getAll()
        return this.response(res).ok(branch);
    }
}
