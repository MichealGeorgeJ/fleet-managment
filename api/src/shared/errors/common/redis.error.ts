import { StatusCode } from "../../enum/status-code.enum";
import { AppError } from "./app.error";

export class RedisError extends AppError {
    constructor(message: string) {
        super(StatusCode.INTERNAL_SERVER_ERROR, message);
        this.name = new.target.name;
    }
}