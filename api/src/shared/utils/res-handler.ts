import type { Response } from "express";
import { StatusCode } from "../enum/status-code.enum";

export class ResponseHandler {

    protected response: Response;

    constructor(response: Response) {
        this.response = response;
    }

    protected sendResponse<T>(statusCode: StatusCode, data?: T) {
        this.response.status(statusCode).json({
            success: true,
            data
        });
    }

    sendError(statusCode: StatusCode, message: string) {
        this.response.status(statusCode).json({
            success: false,
            message
        });
    }

    ok<T>(data: T): void {
        this.sendResponse(StatusCode.OK, data);
    }

    created<T>(data: T): void {
        this.sendResponse(StatusCode.CREATED, data);
    }

    accepted<T>(data: T): void {
        this.sendResponse(StatusCode.ACCEPTED, data);
    }

    noContent(): void {
        this.response.status(StatusCode.NO_CONTENT).send();
    }

}