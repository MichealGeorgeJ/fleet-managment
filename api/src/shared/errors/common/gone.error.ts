import { StatusCode } from "../../enum/status-code.enum";
import { AppError } from "./app.error";

export class GoneError extends AppError {

    constructor(message: string) {
        super(StatusCode.GONE, message);
        this.name = new.target.name;
    }
}