import { BranchStatus } from "../../shared/enum/branch.enum";
import type { BranchRepo } from "./branch.repo";
import type { BranchRequest, IBranch } from "./branch.type";

export class BranchService {

    constructor(private readonly branchRepo: BranchRepo) { }

    async create(data: BranchRequest): Promise<IBranch> {
        const count = await this.branchRepo.count()
        const code = `BR-${count + 1}`
        const branch = { ...data, code, status: BranchStatus.ACTIVE }
        return this.branchRepo.create(branch)
    }

    async update(id: number, data: BranchRequest): Promise<IBranch> {
        return this.branchRepo.update(id, data)
    }

    async delete(id: number): Promise<void> {
        return this.branchRepo.delete(id)
    }

    async getById(id: number): Promise<IBranch> {
        return this.branchRepo.getById(id)
    }

    async getAll(): Promise<IBranch[]> {
        return this.branchRepo.getAll()
    }
}
