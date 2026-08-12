import { z } from "../zod";
import { registry } from "../registry";
import { ErrorSchema } from "../common/error.schema";
import { SuccessSchema } from "../common/sucess.schema";


export class UserDocs {

    static readonly User = registry.register(
        "User",
        z.object({
            id: z.number().openapi({ example: 1 }),
            branchId: z.number().nullable().openapi({ example: 1 }),
            employeeCode: z.string().nullable().openapi({ example: "EMP001" }),
            name: z.string().openapi({ example: "John Doe" }),
            email: z.string().email().openapi({ example: "john@example.com" }),
            phone: z.string().nullable().openapi({ example: "9876543210" }),
            profilePic: z.number().nullable().openapi({ example: 10 }),
            status: z.boolean().openapi({ example: true }),
            lastLoginAt: z.date().nullable(),
            createdAt: z.date(),
            updatedAt: z.date(),
        })
    );

    static readonly CreateRequest = registry.register(
        "CreateUserRequest",
        z.object({
            branchId: z.number().optional().openapi({ example: 1 }),
            name: z.string().openapi({ example: "John Doe" }),
            email: z.string().email().openapi({ example: "michealgeorge1317@gmail.com" })
        })
    );

    static readonly UpdateRequest = registry.register(
        "UpdateUserRequest",
        z.object({
            name: z.string().optional().openapi({ example: "John Doe" }),
            profilePic: z.number().optional().openapi({ example: 10 }),
        })
    );

    static readonly Params = registry.register(
        "UserParams",
        z.object({
            id: z.number().openapi({ example: 1 }),
        })
    );

    static {
        registry.registerPath({
            method: "post",
            path: "/users",
            tags: ["Users"],
            summary: "Create a user",
            description: "Create a user",
            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: UserDocs.CreateRequest,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "User created successfully",
                    content: {
                        "application/json": {
                            schema: UserDocs.User,
                        },
                    },
                },
                400: {
                    description: "Bad Request",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.BadRequest,
                        },
                    },
                },
            },
        });

        registry.registerPath({
            method: "get",
            path: "/users/{id}",
            tags: ["Users"],
            summary: "Get a user by ID",
            description: "Get a user by ID",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "number" } },
            ],
            responses: {
                200: {
                    description: "User found successfully",
                    content: {
                        "application/json": {
                            schema: SuccessSchema.success(UserDocs.User),
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

        registry.registerPath({
            method: "patch",
            path: "/users/{id}",
            tags: ["Users"],
            summary: "Update a user by ID",
            description: "Update a user by ID",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "number" } },
            ],
            responses: {
                200: {
                    description: "User updated successfully",
                    content: {
                        "application/json": {
                            schema: UserDocs.User,
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

        registry.registerPath({
            method: "delete",
            path: "/users/{id}",
            tags: ["Users"],
            summary: "Delete a user by ID",
            description: "Delete a user by ID",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "number" } },
            ],
            responses: {

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

        registry.registerPath({
            method: "get",
            path: "/users",
            tags: ["Users"],
            summary: "Get all users",
            description: "Get all users",
            responses: {
                200: {
                    description: "Users found successfully",
                    content: {
                        "application/json": {
                            schema: z.array(UserDocs.User),
                        },
                    },
                },
                404: {
                    description: "Users not found",
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