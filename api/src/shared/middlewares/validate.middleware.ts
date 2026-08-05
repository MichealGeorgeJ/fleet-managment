import type { Request, Response, NextFunction } from "express";
import { z, type ZodType } from "zod";
import { FormatUtils } from "../utils/format-utils";
import { ResponseHandler } from "../utils/res-handler";
import { StatusCode } from "../enum/status-code.enum";

type ValidationTarget = "body" | "params" | "query";

export const validate = (schemas: Partial<Record<ValidationTarget, ZodType>>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const target of Object.keys(schemas) as ValidationTarget[]) {
        const schema = schemas[target];
        if (!schema) continue;

        const result = schema.parse(req[target]);
        req[target] = result;
      }
      next();
    } catch (e) {
      const message = FormatUtils.formatZodError(e as z.ZodError);
      new ResponseHandler(res).sendError(StatusCode.BAD_REQUEST, message);
    }
  };
};