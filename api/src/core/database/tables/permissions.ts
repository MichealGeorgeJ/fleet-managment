import { defineTable } from "./helpers";

export class Permissions {

    static readonly permissions = defineTable("permissions", {
        id: 'id',
        code: 'code'        
    });


}