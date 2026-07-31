import type { DatabaseError } from "pg";
import { BadRequestError } from "../common/bad-request.error";

export class InvalidTextRepresentationError extends BadRequestError {

    constructor(error: DatabaseError) {
        super(
            error.column
                ? `Invalid value for '${error.column}'.`
                : "Invalid value supplied."
        );
    }

}