import { StatusCode } from "../../enum/status-code.enum";
import { AppError } from "./app.error";

export class BadRequestError extends AppError {

    constructor(message: string) {
        super(StatusCode.BAD_REQUEST, message);
        this.name = new.target.name;
    }

}