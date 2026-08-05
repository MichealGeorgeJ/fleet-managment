import { AuditLogs } from "./audit-logs";
import { Branches } from "./branches";
import { Files } from "./files";
import { Permissions } from "./permissions";
import { RolePermissionMappings } from "./role-permission-mappings";
import { Roles } from "./roles";
import { SessionEvents } from "./session-events";
import { Sessions } from "./sessions";
import { UserRoleMappings } from "./user-role-mappings";
import { Users } from "./users";

const allTableDefs = {
    ...Branches,
    ...Files,
    ...Users,
    ...Sessions,
    ...SessionEvents,
    ...AuditLogs,
    ...Permissions,
    ...Roles,
    ...RolePermissionMappings,
    ...UserRoleMappings
} as const;

export const Tables = { ...allTableDefs } as const;