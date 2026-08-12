import { z } from "zod";
import { branchRequestSchema, branchCreatePayloadSchema, branchUpdatePayloadSchema } from "./branch.schema";
import { Nullable } from "../../shared/types/common";

export type BranchRequest = z.infer<typeof branchRequestSchema>;
export type BranchCreatePayload = z.infer<typeof branchCreatePayloadSchema>;
export type BranchUpdatePayload = z.infer<typeof branchUpdatePayloadSchema>;

export interface IBranch {
    id: Nullable<number>;
    name: Nullable<string>;
    code: Nullable<string>;
    country: Nullable<string>;
    state: Nullable<string>;
    district: Nullable<string>;
    address: Nullable<string>;
    phone: Nullable<string>;
    status: Nullable<boolean>;
    createdAt: Nullable<Date>;
    updatedAt: Nullable<Date>;
}
