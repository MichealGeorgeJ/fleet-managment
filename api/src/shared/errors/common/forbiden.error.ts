import { StatusCode } from "../../enum/status-code.enum";
import { AppError } from "./app.error";

export class ForbidenError extends AppError {

    constructor(message: string) {
        super(StatusCode.FORBIDDEN, message);
        this.name = new.target.name;
    }
}