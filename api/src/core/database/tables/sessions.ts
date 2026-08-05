import { defineTable } from "./helpers";

export class Sessions {

    static readonly sessions = defineTable("sessions", {
        id: 'id',
        userId: 'user_id',
        deviceName: 'device_name',
        deviceFingerprint: 'device_type',
        ipAddress: 'ip_address',
        userAgent: 'user_agent',
        platform: 'platform',
        refreshToken: 'refresh_token',
        isRevoked: 'is_revoked',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        lastUsedAt: 'last_used_at'
    });


}