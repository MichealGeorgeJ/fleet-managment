import { z } from "../zod";
import { registry } from "../registry";

export class SuccessSchema {
    static readonly success = (data?: z.ZodTypeAny) => registry.register(
        "Success",
        z.object({
            success: z.boolean().openapi({ example: true }),
            data: data || z.any(),
        })
    );
}