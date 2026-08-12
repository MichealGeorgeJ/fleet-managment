import z from "zod";
import { REGEX_CONSTANTS } from "../../shared/constants/regex.constant";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";

export const loginSchema = z.object({
    email: z.string().regex(REGEX_CONSTANTS.EMAIL, "Invalid email"),
    password: z.string()
        .min(APP_CONSTANTS.MIN_PASSWORD_LENGTH, "Password must be at least 6 characters long")
        .regex(REGEX_CONSTANTS.PASSWORD, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
});

export const verifyOtpSchema = z.object({
    key: z.string(),
    otp: z.string().regex(REGEX_CONSTANTS.OTP, "Otp must be 6 digits")
});

export const refreshSessionSchema = z.object({
    refreshToken: z.string()
});

export const forgotPasswordSchema = z.object({
    email: z.string().regex(REGEX_CONSTANTS.EMAIL, "Invalid email"),
});

export const resetPasswordSchema = z.object({
    key: z.string(),
    otp: z.string().regex(REGEX_CONSTANTS.OTP, "Otp must be 6 digits"),
    password: z.string()
        .min(APP_CONSTANTS.MIN_PASSWORD_LENGTH, "Password must be at least 6 characters long")
        .regex(REGEX_CONSTANTS.PASSWORD, "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character")
});

export const logoutSchema = z.object({
    refreshToken: z.string()
});


export type LoginRequest = z.infer<typeof loginSchema>
export type VerifyOtpRequest = z.infer<typeof verifyOtpSchema>
export type RefreshSessionRequest = z.infer<typeof refreshSessionSchema>
export type ForgotPasswordRequest = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordRequest = z.infer<typeof resetPasswordSchema>
export type LogoutRequest = z.infer<typeof logoutSchema>


