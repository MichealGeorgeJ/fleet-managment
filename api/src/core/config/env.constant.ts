import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
    PORT: z.coerce.number().int().positive(),

    DB_HOST: z.string().min(1),
    DB_PORT: z.coerce.number().int().positive(),
    DB_USER: z.string().min(1),
    DB_PASSWORD: z.string().min(1),
    DB_NAME: z.string().min(1),

    PASETO_PRIVATE_KEY: z.string().min(1),
    PASETO_PUBLIC_KEY: z.string().min(1),

    EMAIL_USER: z.string().min(1),
    EMAIL_PORT: z.coerce.number().int().positive(),
    EMAIL_PASSWORD: z.string().min(1),

    REDIS_URL: z.string().min(1),

    WEB_URL: z.string().min(1),
    
    APP_NAME: z.string().min(1),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.error('Invalid environment variables:', parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const ENV = parsed.data;