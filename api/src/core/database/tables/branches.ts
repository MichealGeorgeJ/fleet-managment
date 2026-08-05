import { defineTable } from "./helpers";

export class Branches {

    static readonly branches = defineTable("branches", {
        id: 'id',
        name: 'name',
        code: 'code',
        country: 'country',
        state: 'state',
        district: 'district',
        address: 'address',
        phone: 'phone',
        status: 'status',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });


}