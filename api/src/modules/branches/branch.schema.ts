import { z } from "zod";
import { BranchStatus } from "../../shared/enum/branch.enum";

export const branchRequestSchema = z.object({
    name: z.string().min(1, "Name is required"),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    district: z.string().min(1, "District is required"),
    address: z.string().min(1, "Address is required"),
    phone: z.string().min(1, "Phone is required"),
});

export const branchCreatePayloadSchema = branchRequestSchema.extend({
    status: z.enum(BranchStatus),
    code: z.string(),
});

export const branchUpdatePayloadSchema = branchRequestSchema

export const branchParamsSchema = z.object({
    id: z.coerce.number(),
});
    
