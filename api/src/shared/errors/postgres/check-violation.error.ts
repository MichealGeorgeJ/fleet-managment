import type { DatabaseError } from "pg";
import { BadRequestError } from "../common/bad-request.error";

export class CheckViolationError extends BadRequestError {

    constructor(error: DatabaseError) {
        super(error.detail ?? "Check constraint violated.");
    }

}