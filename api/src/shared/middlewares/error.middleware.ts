import type {
    NextFunction,
    Request,
    Response
} from "express";
import { ResponseHandler } from "../utils/res-handler";
import { StatusCode } from "../enum/status-code.enum";
import { AppError } from "../errors/common/app.error";


export class ErrorMiddleware {

    handle = (e: Error, req: Request, res: Response, next: NextFunction): void => {

        if (res.headersSent) {
            return next(e);
        }

        if (e instanceof AppError) {
            new ResponseHandler(res).sendError(e.statusCode, e.message);
            return;
        }
console.log(e);
        new ResponseHandler(res).sendError(StatusCode.INTERNAL_SERVER_ERROR, "Internal Server Error");

    };

}

export const errorHandler = new ErrorMiddleware().handle;
