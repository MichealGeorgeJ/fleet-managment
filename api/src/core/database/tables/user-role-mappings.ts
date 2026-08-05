import { defineTable } from "./helpers";

export class UserRoleMappings {

    static readonly userRoleMappings = defineTable("user_role_mappings", {
        id: 'id',
        userId: 'user_id',
        roleId: 'role_id'        
    });


}