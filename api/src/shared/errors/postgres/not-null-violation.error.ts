import type { DatabaseError } from "pg";
import { BadRequestError } from "../common/bad-request.error";

export class NotNullViolationError extends BadRequestError {

    constructor(error: DatabaseError) {
        super(
            `${error.column ?? "Field"} is required.`
        );
    }

}