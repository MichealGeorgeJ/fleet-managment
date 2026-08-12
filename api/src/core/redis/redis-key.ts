export const RedisKeys = {
    EMAIL_OTP: (key: string) => `email:otp:${key}`,
    USER_SESSION: (userId: number, sessionId: number) => `user:session:${userId}:${sessionId}`
} as const;