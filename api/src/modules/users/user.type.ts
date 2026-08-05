import { z } from 'zod';
import { changeEmailSchema, changePasswordSchema, createUserSchema, updateUserSchema } from './user.schema';
import { Nullable } from '../../shared/types/common';

export type CreateUserRequest = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type ChangePassword = z.infer<typeof changePasswordSchema>;
export type ChangeEmail = z.infer<typeof changeEmailSchema>;

export interface CreateUser extends CreateUserRequest {
    passwordHash: string;
    employeeCode: string;
    status: number;
}

export interface IUser {
    id: Nullable<number>;
    branchId: Nullable<number>;
    employeeCode: Nullable<string>;
    name: Nullable<string>;
    email: Nullable<string>;
    phone: Nullable<string>;
    passwordHash: Nullable<string>;
    profilePic: Nullable<number>;
    status: Nullable<boolean>;
    lastLoginAt: Nullable<Date>;
    createdAt: Nullable<Date>;
    updatedAt: Nullable<Date>;
}

