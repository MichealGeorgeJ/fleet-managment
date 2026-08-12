import { z } from "../zod";
import { registry } from "../registry";
import { ErrorSchema } from "../common/error.schema";
import { SuccessSchema } from "../common/sucess.schema";

export class BranchDocs {

    static readonly Branch = registry.register(
        "Branch",
        z.object({
            id: z.number().nullable().openapi({ example: 1 }),
            name: z.string().nullable().openapi({ example: "Main Branch" }),
            code: z.string().nullable().openapi({ example: "BR-1" }),
            country: z.string().nullable().openapi({ example: "India" }),
            state: z.string().nullable().openapi({ example: "Kerala" }),
            district: z.string().nullable().openapi({ example: "Ernakulam" }),
            address: z.string().nullable().openapi({ example: "MG Road, Kochi" }),
            phone: z.string().nullable().openapi({ example: "9876543210" }),
            status: z.boolean().nullable().openapi({ example: true }),
            createdAt: z.date().nullable(),
            updatedAt: z.date().nullable(),
        })
    );

    static readonly CreateRequest = registry.register(
        "CreateBranchRequest",
        z.object({
            name: z.string().openapi({ example: "Main Branch" }),
            country: z.string().openapi({ example: "India" }),
            state: z.string().openapi({ example: "Kerala" }),
            district: z.string().openapi({ example: "Ernakulam" }),
            address: z.string().openapi({ example: "MG Road, Kochi" }),
            phone: z.string().openapi({ example: "9876543210" }),
        })
    );

    static readonly UpdateRequest = registry.register(
        "UpdateBranchRequest",
        z.object({
            name: z.string().optional().openapi({ example: "Main Branch" }),
            country: z.string().optional().openapi({ example: "India" }),
            state: z.string().optional().openapi({ example: "Kerala" }),
            district: z.string().optional().openapi({ example: "Ernakulam" }),
            address: z.string().optional().openapi({ example: "MG Road, Kochi" }),
            phone: z.string().optional().openapi({ example: "9876543210" }),
        })
    );

    static readonly Params = registry.register(
        "BranchParams",
        z.object({
            id: z.number().openapi({ example: 1 }),
        })
    );

    static {
        // Create Branch
        registry.registerPath({
            method: "post",
            path: "/branches",
            tags: ["Branches"],
            summary: "Create a branch",
            description: "Create a branch",
            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: BranchDocs.CreateRequest,
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: "Branch created successfully",
                    content: {
                        "application/json": {
                            schema: BranchDocs.Branch,
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

        // Get Branch by ID
        registry.registerPath({
            method: "get",
            path: "/branches/{id}",
            tags: ["Branches"],
            summary: "Get a branch by ID",
            description: "Get a branch by ID",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "number" } },
            ],
            responses: {
                200: {
                    description: "Branch found successfully",
                    content: {
                        "application/json": {
                            schema: SuccessSchema.success(BranchDocs.Branch),
                        },
                    },
                },
                404: {
                    description: "Branch not found",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.NotFound,
                        },
                    },
                },
            },
        });

        // Update Branch
        registry.registerPath({
            method: "put",
            path: "/branches/{id}",
            tags: ["Branches"],
            summary: "Update a branch by ID",
            description: "Update a branch by ID",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "number" } },
            ],
            request: {
                body: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: BranchDocs.UpdateRequest,
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: "Branch updated successfully",
                    content: {
                        "application/json": {
                            schema: BranchDocs.Branch,
                        },
                    },
                },
                404: {
                    description: "Branch not found",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.NotFound,
                        },
                    },
                },
            },
        });

        // Delete Branch
        registry.registerPath({
            method: "delete",
            path: "/branches/{id}",
            tags: ["Branches"],
            summary: "Delete a branch by ID",
            description: "Delete a branch by ID",
            parameters: [
                { name: "id", in: "path", required: true, schema: { type: "number" } },
            ],
            responses: {
                204: {
                    description: "Branch deleted successfully",
                },
                404: {
                    description: "Branch not found",
                    content: {
                        "application/json": {
                            schema: ErrorSchema.NotFound,
                        },
                    },
                },
            },
        });

        // Get All Branches
        registry.registerPath({
            method: "get",
            path: "/branches",
            tags: ["Branches"],
            summary: "Get all branches",
            description: "Get all branches",
            responses: {
                200: {
                    description: "Branches found successfully",
                    content: {
                        "application/json": {
                            schema: z.array(BranchDocs.Branch),
                        },
                    },
                },
                404: {
                    description: "Branches not found",
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