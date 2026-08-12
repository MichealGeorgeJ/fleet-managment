import { validate } from "../../shared/middlewares/validate.middleware";
import { branchParamsSchema, branchRequestSchema } from "./branch.schema";

export const validateCreateBranch = validate({ body: branchRequestSchema });
export const validateUpdateBranch = validate({ body: branchRequestSchema, params: branchParamsSchema });
export const validateDeleteBranch = validate({ params: branchParamsSchema });
export const validateGetByIdBranch = validate({ params: branchParamsSchema });

