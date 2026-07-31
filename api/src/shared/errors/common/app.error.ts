import type { StatusCode } from "../../enum/status-code.enum";

export class AppError extends Error {

    constructor(public readonly statusCode: StatusCode, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = new.target.name;
        Error.captureStackTrace(this, this.constructor);
    }

}