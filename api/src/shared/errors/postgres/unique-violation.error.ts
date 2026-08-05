import type { DatabaseError } from "pg";
import { ConflictError } from "../common/conflict.error";

export class UniqueViolationError extends ConflictError {

    constructor(error: DatabaseError) {
        super(error.detail ?? "Duplicate record.");
    }

}