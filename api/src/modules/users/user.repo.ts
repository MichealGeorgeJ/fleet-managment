import { Tables } from "../../core/database/tables/index";
import { BaseRepo } from "../../shared/base/base.repo";
import { UserStatus } from "../../shared/enum/users.enum";
import { NotFoundError } from "../../shared/errors/common/not-found.error";
import { Value } from "../../shared/utils/value";
import { UserMapper } from "./user.mapper";
import type { CreateUser, IUser, UpdateUser } from "./user.type";

export class UserRepo extends BaseRepo {
    constructor() {
        super();
    }

    async create(data: CreateUser): Promise<IUser> {
        const { tableName, columns } = Tables.users

        const query = `INSERT INTO ${tableName} (${columns.name}, ${columns.employeeCode}, ${columns.email}, ${columns.passwordHash}, ${columns.branchId}, ${columns.status}) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const result = await this.query(query, [data.name, data.employeeCode, data.email, data.passwordHash, data.branchId, data.status]);
        return UserMapper.toUser(result.rows[0]);
    }


    async update(id: number, data: UpdateUser): Promise<IUser> {
        const { tableName, columns } = Tables.users

        const query = `UPDATE ${tableName} SET ${columns.name} = $1, ${columns.profilePic} = $2 WHERE ${columns.id} = $3 RETURNING *`;
        const result = await this.query(query, [data.name, data.profilePic, id]);

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError(`User not found with id: ${id}`);
        }
        return UserMapper.toUser(result.rows[0]);
    }

    async updatePassword(id: number, passwordHash: string): Promise<IUser> {
        const { tableName, columns } = Tables.users

        const query = `UPDATE ${tableName} SET ${columns.passwordHash} = $1 WHERE ${columns.id} = $2 RETURNING *`;
        const result = await this.query(query, [passwordHash, id]);

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError(`User not found with id: ${id}`);
        }
        return UserMapper.toUser(result.rows[0]);
    }


    async delete(id: number, status: number): Promise<IUser> {
        const { tableName, columns } = Tables.users

        const query = `UPDATE ${tableName} SET ${columns.status} = $1 WHERE ${columns.id} = $2 RETURNING *`;
        const result = await this.query(query, [status, id]);
        return UserMapper.toUser(result.rows[0]);
    }

    async countByBranchId(branchId: number): Promise<number> {
        const { tableName, columns } = Tables.users;
        const query = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${columns.branchId} = $1`;
        const result = await this.query(query, [branchId]);
        return Number(result.rows[0].count);
    }

    async findById(id: number): Promise<IUser> {
        const { tableName, columns } = Tables.users

        const query = `SELECT * FROM ${tableName} WHERE ${columns.id} = $1`;
        const result = await this.query(query, [id]);

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError(`User not found with id: ${id}`);
        }
        return UserMapper.toUser(result.rows[0]);
    }

    async findByEmail(email: string): Promise<IUser> {
        const { tableName, columns } = Tables.users

        const query = `SELECT * FROM ${tableName} WHERE ${columns.email} = $1`;
        const result = await this.query(query, [email]);

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError(`User not found with email: ${email}`);
        }
        return UserMapper.toUser(result.rows[0]);
    }

    async getAll(): Promise<IUser[]> {
        const { tableName, columns } = Tables.users

        const query = `SELECT * FROM ${tableName} WHERE ${columns.status} != $1 ORDER BY ${columns.createdAt} DESC`;
        const result = await this.query(query, [UserStatus.DELETED]);

        return result.rows.map((row) => UserMapper.toUser(row));
    }
}
