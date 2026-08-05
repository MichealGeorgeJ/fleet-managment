import dotenv from "dotenv";
dotenv.config();

export const ENV = {
    PORT: Number(process.env.PORT),
    DB_HOST: process.env.DB_HOST,
    DB_PORT: Number(process.env.DB_PORT),
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    PASETO_PRIVATE_KEY: process.env.PASETO_PRIVATE_KEY,
    PASETO_PUBLIC_KEY: process.env.PASETO_PUBLIC_KEY,
} as const;