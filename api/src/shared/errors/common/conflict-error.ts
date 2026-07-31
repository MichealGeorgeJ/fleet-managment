import { StatusCode } from "../../enum/status-code.enum";
import { AppError } from "./app.error";

export class ConflictError extends AppError {

    constructor(message: string) {
        super(StatusCode.CONFLICT, message);
        this.name = new.target.name;
    }

}