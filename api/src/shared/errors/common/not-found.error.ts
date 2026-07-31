import { StatusCode } from "../../enum/status-code.enum";
import { AppError } from "./app.error";

export class NotFoundError extends AppError {

    constructor(message: string) {
        super(StatusCode.NOT_FOUND, message);
        this.name = new.target.name;
    }

}