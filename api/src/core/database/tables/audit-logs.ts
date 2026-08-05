import { defineTable } from "./helpers";

export class AuditLogs {

    static readonly auditLogs = defineTable("audit_logs", {
        id: 'id',
        userId: 'user_id',
        requestId: 'request_id',
        entityName: 'entity_name',
        rowId: 'row_id',
        action: 'action',
        oldRow: 'old_row',
        newRow: 'new_row',
        ipAddress: 'ip_address',
        userAgent: 'user_agent',
        platform: 'platform',
        createdAt: 'created_at'
    });


}