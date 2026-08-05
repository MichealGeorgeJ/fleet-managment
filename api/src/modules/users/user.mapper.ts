import { Tables } from "../../core/database/tables";
import { Value } from "../../shared/utils/value";
import { IUser } from "./user.type";

export class UserMapper {
    static toUser(raw: Record<string, any>): IUser {
        const { columns } = Tables.users
        return {
            id: Value.of(raw[columns.id]).toNullableNumber()!,
            branchId: Value.of(raw[columns.branchId]).toNullableNumber(),
            employeeCode: Value.of(raw[columns.employeeCode]).toNullableString(),
            name: Value.of(raw[columns.name]).toNullableString(),
            email: Value.of(raw[columns.email]).toNullableString(),
            phone: Value.of(raw[columns.phone]).toNullableString(),
            passwordHash: Value.of(raw[columns.passwordHash]).toNullableString(),
            profilePic: Value.of(raw[columns.profilePic]).toNullableNumber(),
            status: Value.of(raw[columns.status]).toNullableBoolean(),
            lastLoginAt: Value.of(raw[columns.lastLoginAt]).toNullableDate(),
            createdAt: Value.of(raw[columns.createdAt]).toNullableDate(),
            updatedAt: Value.of(raw[columns.updatedAt]).toNullableDate()
        };
    }
}