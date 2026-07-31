import type { DatabaseError } from "pg";
import { BadRequestError } from "../common/bad-request.error";

export class StringTooLongError extends BadRequestError {

    constructor(error: DatabaseError) {
        super(
            error.column
                ? `${error.column} exceeds the maximum allowed length.`
                : "Input exceeds the maximum allowed length."
        );
    }

}