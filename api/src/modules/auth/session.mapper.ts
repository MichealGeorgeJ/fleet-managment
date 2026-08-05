import { Tables } from "../../core/database/tables";
import { Value } from "../../shared/utils/value";
import { ISession } from "./auth.type";

export class SessionMapper {

    static toSession(request: Record<string, any>): ISession {
        const { columns } = Tables.sessions
        return {
            id: Value.of(request[columns.id]).toNullableNumber(),
            userId: Value.of(request[columns.userId]).toNullableNumber(),
            deviceName: Value.of(request[columns.deviceName]).toNullableString(),
            deviceFingerprint: Value.of(request[columns.deviceFingerprint]).toNullableString(),
            ipAddress: Value.of(request[columns.ipAddress]).toNullableString(),
            userAgent: Value.of(request[columns.userAgent]).toNullableString(),
            platform: Value.of(request[columns.platform]).toNullableString(),
            refreshToken: Value.of(request[columns.refreshToken]).toNullableString(),
            isRevoked: Value.of(request[columns.isRevoked]).toNullableBoolean(),
            createdAt: Value.of(request[columns.createdAt]).toNullableDate(),
            updatedAt: Value.of(request[columns.updatedAt]).toNullableDate(),
            lastUsedAt: Value.of(request[columns.lastUsedAt]).toNullableDate()
        }
    }
}