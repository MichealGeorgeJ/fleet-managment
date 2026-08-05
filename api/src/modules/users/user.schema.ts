import { z } from "zod";

export const createUserSchema = z.object({
    branchId: z.coerce.number(),
    name: z.string().min(1, "Name is required"),
    email: z.string().email()
});

export const updateUserSchema = z.object({
    name: z.string().min(1, "Name is required").optional(),
    profilePic: z.coerce.number().optional(),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old Password is required"),
    newPassword: z.string().min(1, "New Password is required")
});

export const changeEmailSchema = z.object({
    userId: z.coerce.number(),
    newEmail: z.string().email()
});