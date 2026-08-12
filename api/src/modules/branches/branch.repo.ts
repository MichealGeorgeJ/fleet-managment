import { Tables } from "../../core/database/tables";
import { BaseRepo } from "../../shared/base/base.repo";
import { BranchStatus } from "../../shared/enum/branch.enum";
import { NotFoundError } from "../../shared/errors/common/not-found.error";
import { Value } from "../../shared/utils/value";
import { BranchMapper } from "./branch.mapper";
import { BranchCreatePayload, BranchUpdatePayload, IBranch } from "./branch.type";

export class BranchRepo extends BaseRepo {
    constructor() {
        super();
    }

    async create(data: BranchCreatePayload): Promise<IBranch> {
        const { tableName, columns } = Tables.branches;

        const query = `INSERT INTO ${tableName}
                            (${columns.name}, ${columns.code},
                            ${columns.phone}, ${columns.address},
                            ${columns.district}, ${columns.state},
                            ${columns.country}, ${columns.status})
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                        RETURNING *`

        const result = await this.query(query, [
            data.name, data.code,
            data.phone, data.address,
            data.district, data.state,
            data.country, data.status
        ])

        return BranchMapper.toBranch(result.rows[0])
    }

    async update(id: number, data: BranchUpdatePayload): Promise<IBranch> {
        const { tableName, columns } = Tables.branches;

        const query = `UPDATE ${tableName}
                        SET ${columns.name} = $1,
                        ${columns.phone} = $2,
                        ${columns.address} = $3,
                        ${columns.district} = $4,
                        ${columns.state} = $5,
                        ${columns.country} = $6,
                        WHERE ${columns.id} = $7
                        RETURNING *`

        const result = await this.query(query, [
            data.name,
            data.phone,
            data.address,
            data.district,
            data.state,
            data.country,
            id
        ])

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError('Branch not found')
        }

        return BranchMapper.toBranch(result.rows[0])
    }

    async toggleStatus(id: number, status: BranchStatus): Promise<IBranch> {
        const { tableName, columns } = Tables.branches;

        const query = `UPDATE ${tableName}
                        SET ${columns.status} = $1
                        WHERE ${columns.id} = $2
                        RETURNING *`

        const result = await this.query(query, [status, id])

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError('Branch not found')
        }

        return BranchMapper.toBranch(result.rows[0])
    }

    async delete(id: number): Promise<void> {
        const { tableName, columns } = Tables.branches;

        const query = `DELETE FROM ${tableName} WHERE ${columns.id} = $1 RETURNING *`
        const result = await this.query(query, [id])

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError('Branch not found')
        }
    }

    async getById(id: number): Promise<IBranch> {
        const { tableName, columns } = Tables.branches;

        const query = `SELECT * FROM ${tableName} WHERE ${columns.id} = $1`
        const result = await this.query(query, [id])

        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError('Branch not found')
        }

        return BranchMapper.toBranch(result.rows[0])
    }

    async getAll(): Promise<IBranch[]> {
        const { tableName, columns } = Tables.branches;

        const query = `SELECT * FROM ${tableName}`
        const result = await this.query(query)

        return result.rows.map((row) => BranchMapper.toBranch(row))
    }

    async count(): Promise<number> {
        const { tableName } = Tables.branches;

        const query = `SELECT COUNT(*) FROM ${tableName}`
        const result = await this.query(query)

        return Value.of(result.rows[0].count).toNumber()
    }

}
