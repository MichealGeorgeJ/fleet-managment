import { z } from "../zod";
import { registry } from "../registry";
import { ErrorSchema } from "../common/error.schema";
import { SuccessSchema } from "../common/sucess.schema";

export class AuthDocs {

    // ============================================================
    // Request Schemas
    // ============================================================

    static readonly LoginRequest = registry.register(
        "LoginRequest",
        z.object({
            email: z
                .string()
                .email()
                .openapi({
                    example: "john@example.com",
                }),

            password: z
                .string()
                .openapi({
                    example: "Password@123",
                }),
        })
    );

    static readonly VerifyOtpRequest = registry.register(
        "VerifyOtpRequest",
        z.object({
            key: z
                .string()
                .openapi({
                    example: "a8f7c9d2-1234-4567-8901-abcdef123456",
                }),

            otp: z
                .string()
                .length(6)
                .openapi({
                    example: "123456",
                }),
        })
    );

    static readonly RefreshTokenRequest = registry.register(
        "RefreshTokenRequest",
        z.object({
            refreshToken: z
                .string()
                .openapi({
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                }),
        })
    );

    static readonly ForgotPasswordRequest = registry.register(
        "ForgotPasswordRequest",
        z.object({
            email: z
                .string()
                .email()
                .openapi({
                    example: "john@example.com",
                }),
        })
    );

    static readonly ResetPasswordRequest = registry.register(
        "ResetPasswordRequest",
        z.object({
            key: z
                .string()
                .openapi({
                    example: "a8f7c9d2-1234-4567-8901-abcdef123456",
                }),

            otp: z
                .string()
                .length(6)
                .openapi({
                    example: "123456",
                }),

            password: z
                .string()
                .openapi({
                    example: "NewPassword@123",
                }),
        })
    );

    static readonly LogoutRequest = registry.register(
        "LogoutRequest",
        z.object({
            refreshToken: z
                .string()
                .openapi({
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                }),
        })
    );

    // ============================================================
    // Response Schemas
    // ============================================================

    /**
     * Response returned after successful login.
     *
     * Login only initiates the authentication process.
     * The user must verify the OTP before receiving tokens.
     */
    static readonly LoginResponse = registry.register(
        "LoginResponse",
        z.object({
            key: z
                .string()
                .openapi({
                    example: "a8f7c9d2-1234-4567-8901-abcdef123456",
                }),

            message: z
                .string()
                .openapi({
                    example: "OTP sent successfully",
                }),
        })
    );

    /**
     * Authenticated session response.
     */
    static readonly AuthResponse = registry.register(
        "AuthResponse",
        z.object({
            accessToken: z
                .string()
                .openapi({
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                }),

            refreshToken: z
                .string()
                .openapi({
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                }),

            expiresIn: z
                .number()
                .openapi({
                    example: 3600,
                }),
        })
    );

    /**
     * Generic OTP response.
     */
    static readonly OtpResponse = registry.register(
        "OtpResponse",
        z.object({
            message: z
                .string()
                .openapi({
                    example: "OTP verified successfully",
                }),
        })
    );

    /**
     * Forgot password response.
     */
    static readonly ForgotPasswordResponse = registry.register(
        "ForgotPasswordResponse",
        z.object({
            key: z
                .string()
                .openapi({
                    example: "a8f7c9d2-1234-4567-8901-abcdef123456",
                }),

            message: z
                .string()
                .openapi({
                    example: "OTP sent successfully",
                }),
        })
    );

    /**
     * Reset password response.
     */
    static readonly ResetPasswordResponse = registry.register(
        "ResetPasswordResponse",
        z.object({
            message: z
                .string()
                .openapi({
                    example: "Password reset successfully",
                }),
        })
    );

    /**
     * Refresh token response.
     */
    static readonly RefreshTokenResponse = registry.register(
        "RefreshTokenResponse",
        z.object({
            accessToken: z
                .string()
                .openapi({
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                }),

            refreshToken: z
                .string()
                .openapi({
                    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                }),

            expiresIn: z
                .number()
                .openapi({
                    example: 3600,
                }),
        })
    );

    // ============================================================
    // API Documentation
    // ============================================================

    static {
        // --------------------------------------------------------
        // LOGIN
        // --------------------------------------------------------

        registry.registerPath({
            method: "post",
            path: "/auth/login",
            tags: ["Authentication"],
            summary: "Login",
            description:
                "Authenticate a user using email and password. A verification OTP is sent when additional verification is required.",

            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthDocs.LoginRequest,
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "Login initiated successfully",
                    content: {
                        "application/json": {
                            schema: SuccessSchema.success(
                                AuthDocs.LoginResponse
                            ),
                        },
                    },
                },

                400: {
                    description: "Invalid login request",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.BadRequest,
                        },
                    },
                },

                401: {
                    description: "Invalid email or password",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.Unauthorized,
                        },
                    },
                },
            },
        });

        // --------------------------------------------------------
        // VERIFY OTP
        // --------------------------------------------------------

        registry.registerPath({
            method: "post",
            path: "/auth/verify-otp",
            tags: ["Authentication"],
            summary: "Verify login OTP",
            description:
                "Verify the OTP sent to the user and create an authenticated session.",

            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthDocs.VerifyOtpRequest,
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "OTP verified successfully",
                    content: {
                        "application/json": {
                            schema: SuccessSchema.success(
                                AuthDocs.AuthResponse
                            ),
                        },
                    },
                },

                400: {
                    description: "Invalid OTP request",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.BadRequest,
                        },
                    },
                },

                401: {
                    description: "Invalid or expired OTP",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.Unauthorized,
                        },
                    },
                },
            },
        });

        // --------------------------------------------------------
        // REFRESH TOKEN
        // --------------------------------------------------------

        registry.registerPath({
            method: "post",
            path: "/auth/refresh-token",
            tags: ["Authentication"],
            summary: "Refresh access token",
            description:
                "Generate a new access token using a valid refresh token.",

            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthDocs.RefreshTokenRequest,
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "Access token refreshed successfully",
                    content: {
                        "application/json": {
                            schema: SuccessSchema.success(
                                AuthDocs.RefreshTokenResponse
                            ),
                        },
                    },
                },

                400: {
                    description: "Invalid refresh token request",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.BadRequest,
                        },
                    },
                },

                401: {
                    description: "Invalid or expired refresh token",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.Unauthorized,
                        },
                    },
                },

                404: {
                    description: "Session not found",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.NotFound,
                        },
                    },
                },
            },
        });

        // --------------------------------------------------------
        // FORGOT PASSWORD
        // --------------------------------------------------------

        registry.registerPath({
            method: "post",
            path: "/auth/forgot-password",
            tags: ["Authentication"],
            summary: "Forgot password",
            description:
                "Request a password reset OTP for the specified email address.",

            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthDocs.ForgotPasswordRequest,
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "Password reset OTP sent successfully",
                    content: {
                        "application/json": {
                            schema: SuccessSchema.success(
                                AuthDocs.ForgotPasswordResponse
                            ),
                        },
                    },
                },

                400: {
                    description: "Invalid email",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.BadRequest,
                        },
                    },
                },

                404: {
                    description: "User not found",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.NotFound,
                        },
                    },
                },
            },
        });

        // --------------------------------------------------------
        // RESET PASSWORD
        // --------------------------------------------------------

        registry.registerPath({
            method: "post",
            path: "/auth/reset-password",
            tags: ["Authentication"],
            summary: "Reset password",
            description:
                "Reset the user's password using the verification OTP.",

            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthDocs.ResetPasswordRequest,
                        },
                    },
                },
            },

            responses: {
                200: {
                    description: "Password reset successfully",
                    content: {
                        "application/json": {
                            schema: SuccessSchema.success(
                                AuthDocs.ResetPasswordResponse
                            ),
                        },
                    },
                },

                400: {
                    description: "Invalid password reset request",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.BadRequest,
                        },
                    },
                },

                401: {
                    description: "Invalid or expired OTP",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.Unauthorized,
                        },
                    },
                },

                404: {
                    description: "User not found",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.NotFound,
                        },
                    },
                },
            },
        });

        // --------------------------------------------------------
        // LOGOUT
        // --------------------------------------------------------

        registry.registerPath({
            method: "post",
            path: "/auth/logout",
            tags: ["Authentication"],
            summary: "Logout",
            description:
                "Revoke the current user's refresh token and terminate the session.",

            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: AuthDocs.LogoutRequest,
                        },
                    },
                },
            },

            responses: {
                204: {
                    description: "Logged out successfully",
                },

                400: {
                    description: "Invalid logout request",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.BadRequest,
                        },
                    },
                },

                404: {
                    description: "Session not found",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.NotFound,
                        },
                    },
                },
            },
        });
    }
}