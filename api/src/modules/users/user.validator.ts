import { validate } from "../../shared/middlewares/validate.middleware";
import { createUserSchema, updateUserSchema } from "./user.schema";

export const validateCreateUser = validate({ body: createUserSchema });
export const validateUpdateUser = validate({ body: updateUserSchema });
