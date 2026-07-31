import type { DatabaseError } from "pg";
import { CheckViolationError } from "./check-violation.error";
import { ForeignKeyViolationError } from "./foreign-key-violation.error";
import { InvalidTextRepresentationError } from "./invalid-text.error";
import { NotNullViolationError } from "./not-null-violation.error";
import { StringTooLongError } from "./string-too-long.error";
import { UniqueViolationError } from "./unique-violation.error";
import { InternalServerError } from "../common/internal-server.error";


export class PostgresErrorMapper {

    static map(error: DatabaseError): Error {

        switch (error.code) {

            case "23505":
                return new UniqueViolationError(error);

            case "23503":
                return new ForeignKeyViolationError(error);

            case "23502":
                return new NotNullViolationError(error);

            case "23514":
                return new CheckViolationError(error);

            case "22001":
                return new StringTooLongError(error);

            case "22P02":
                return new InvalidTextRepresentationError(error);

            default:
                return new InternalServerError("Internal Server Error");
        }

    }

}