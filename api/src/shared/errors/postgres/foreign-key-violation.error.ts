import type { DatabaseError } from "pg";
import { BadRequestError } from "../common/bad-request.error";

export class ForeignKeyViolationError extends BadRequestError {

    constructor(error: DatabaseError) {
        super(error.detail ?? "Referenced record does not exist.");
    }

}