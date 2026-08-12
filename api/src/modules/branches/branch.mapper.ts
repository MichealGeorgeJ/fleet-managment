import { Tables } from "../../core/database/tables";
import { Value } from "../../shared/utils/value";
import { IBranch } from "./branch.type";

export class BranchMapper {
    static toBranch(row: Record<string, any>): IBranch {
        const { columns } = Tables.branches;
        return {
            id: Value.of(row[columns.id]).toNullableNumber(),
            name: Value.of(row[columns.name]).toNullableString(),
            code: Value.of(row[columns.code]).toNullableString(),
            country: Value.of(row[columns.country]).toNullableString(),
            state: Value.of(row[columns.state]).toNullableString(),
            district: Value.of(row[columns.district]).toNullableString(),
            address: Value.of(row[columns.address]).toNullableString(),
            phone: Value.of(row[columns.phone]).toNullableString(),
            status: Value.of(row[columns.status]).toNullableBoolean(),
            createdAt: Value.of(row[columns.createdAt]).toNullableDate(),
            updatedAt: Value.of(row[columns.updatedAt]).toNullableDate(),
        }
    }

}