import { BUSINESS_CONSTANTS } from "../../shared/constants/business.constants";
import { UserStatus } from "../../shared/enum/users.enum";
import { KeyGen } from "../../shared/utils/key-gen";
import { PasswordUtil } from "../../shared/utils/password";
import type { UserRepo } from "./user.repo";
import { CreateUserRequest, IUser, UpdateUser } from "./user.type";

export class UserService {

    constructor(private readonly userRepo: UserRepo) { }

    async create(data: CreateUserRequest) {

        //Generate password
        const hashedPassword = await PasswordUtil.hash(KeyGen.uniqueKey())

        //Generate employee code
        const employeeCode = await this.generateEmployeeCode(data.branchId);

        const user = { ...data, employeeCode, status: UserStatus.ACTIVE, passwordHash: hashedPassword };

        const { passwordHash, ...rest } = await this.userRepo.create(user);

        return rest;
    }

    async update(id: number, data: UpdateUser): Promise<IUser> {
        return this.userRepo.update(id, data);
    }

    async updatePassword(id: number, password: string): Promise<IUser> {
        const hashedPassword = await PasswordUtil.hash(password);
        return this.userRepo.updatePassword(id, hashedPassword);
    }

    async delete(id: number, status: number): Promise<IUser> {
        return this.userRepo.delete(id, status);
    }

    async findById(id: number): Promise<IUser> {
        return this.userRepo.findById(id);
    }

    async findByEmail(email: string): Promise<IUser> {
        return this.userRepo.findByEmail(email);
    }

    async getAll(): Promise<IUser[]> {
        return this.userRepo.getAll();
    }

    private async generateEmployeeCode(branchId: number) {
        const userCount = await this.userRepo.countByBranchId(branchId);
        return `${BUSINESS_CONSTANTS.EMPLOYEE_CODE_PREFIX}${branchId}-${userCount + 1}`.toUpperCase();
    }

}
