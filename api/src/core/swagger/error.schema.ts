import { StatusCode } from "../../shared/enum/status-code.enum";
import { registry } from "./registry";
import { z } from "./zod";

export class ErrorSchema {
    private static errorObject(code: number, msg: string) {
        return z.object({
            success: z.literal(false).openapi({ example: false }),
            error: z.object({
                code: z.number().openapi({ example: code }),
                msg: z.string().openapi({ example: msg }),
            }),
        });
    }

    static readonly BadRequest = registry.register(
        "BadRequestError",
        ErrorSchema.errorObject(StatusCode.BAD_REQUEST, "The server could not understand the request.").openapi({
            description: "400 — Validation or malformed request error",
        })
    );

    static readonly Unauthorized = registry.register(
        "UnauthorizedError",
        ErrorSchema.errorObject(StatusCode.UNAUTHORIZED, "You are not authorized to perform this action.").openapi({
            description: "401 — Missing or invalid authentication",
        })
    );

    static readonly Forbidden = registry.register(
        "ForbiddenError",
        ErrorSchema.errorObject(StatusCode.FORBIDDEN, "The server understood the request but refuses to authorize it.").openapi({
            description: "403 — Authenticated but not permitted",
        })
    );

    static readonly NotFound = registry.register(
        "NotFoundError",
        ErrorSchema.errorObject(StatusCode.NOT_FOUND, "The resource you are looking for cannot be found.").openapi({
            description: "404 — Resource does not exist",
        })
    );

    static readonly MethodNotAllowed = registry.register(
        "MethodNotAllowedError",
        ErrorSchema.errorObject(StatusCode.METHOD_NOT_ALLOWED, "This HTTP method is not supported for the requested URL.").openapi({
            description: "405 — HTTP method not supported on this endpoint",
        })
    );

    static readonly Conflict = registry.register(
        "ConflictError",
        ErrorSchema.errorObject(StatusCode.CONFLICT, "Request could not be completed due to a conflict.").openapi({
            description: "409 — Duplicate or conflicting resource state",
        })
    );

    static readonly TooManyRequests = registry.register(
        "TooManyRequestsError",
        ErrorSchema.errorObject(StatusCode.TOO_MANY_REQUESTS, "Too many requests. Please wait and try again after some time.").openapi({
            description: "429 — Rate limit exceeded",
        })
    );

    static readonly ServerError = registry.register(
        "ServerError",
        ErrorSchema.errorObject(
            StatusCode.INTERNAL_SERVER_ERROR,
            "Sorry, we are experiencing some technical difficulties. Please try again later."
        ).openapi({
            description: "500 — Unexpected internal server error",
        })
    );

    static readonly ServiceUnavailable = registry.register(
        "ServiceUnavailableError",
        ErrorSchema.errorObject(
            StatusCode.SERVICE_UNAVAILABLE,
            "Service temporarily unavailable. We're working to restore it as quickly as possible."
        ).openapi({
            description: "503 — Service is down or under maintenance",
        })
    );

    static readonly Gone = registry.register(
        "GoneError",
        ErrorSchema.errorObject(
            StatusCode.GONE,
            "The resource you are looking for has been permanently deleted."
        ).openapi({
            description: "410 — The resource has been permanently deleted",
        })
    );

    static readonly UnprocessableEntity = registry.register(
        "UnprocessableEntityError",
        ErrorSchema.errorObject(
            StatusCode.UNPROCESSABLE_ENTITY,
            "The request was well-formed but unable to be processed."
        ).openapi({
            description: "422 — Validation failed",
        })
    );

    static readonly UpgradeRequired = registry.register(
        "UpgradeRequiredError",
        ErrorSchema.errorObject(StatusCode.UPGRADE_REQUIRED, "Upgrade required").openapi({
            description: "426 — Upgrade required",
        })
    );
}