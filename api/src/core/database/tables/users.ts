import { defineTable } from "./helpers";

export class Users {

    static readonly users = defineTable("users", {
        id: 'id',
        branchId: 'branch_id',
        employeeCode: 'employee_code',
        name: 'name',
        email: 'email',
        phone: 'phone',
        passwordHash: 'password_hash',
        profilePic: 'profile_pic',
        status: 'status',
        lastLoginAt: 'last_login_at',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });


}