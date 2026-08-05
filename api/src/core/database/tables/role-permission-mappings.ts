import { defineTable } from "./helpers";

export class RolePermissionMappings {

    static readonly rolePermissionMappings = defineTable("role_permission_mappings", {
        id: 'id',
        roleId: 'role_id',
        permissionId: 'permission_id'        
    });


}