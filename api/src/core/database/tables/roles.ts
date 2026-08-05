import { defineTable } from "./helpers";

export class Roles {

    static readonly roles = defineTable("roles", {
        id: 'id',
        name: 'name',
        description: 'description'        
    });


}