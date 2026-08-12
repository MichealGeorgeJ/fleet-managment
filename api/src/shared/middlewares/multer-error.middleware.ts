import { Request, Response, NextFunction } from "express";
import multer from "multer";
import { ResHandler } from "../utils/res-handler";

export const handleMulterError = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        console.error("Multer Error:", err.code, err.message);

        if (err.code === "LIMIT_FILE_SIZE") {
            return ResHandler.res(res).badRequest("File is too large. Maximum allowed size is 100MB.");
        }
        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return ResHandler.res(res).badRequest(`Unexpected field. Please use 'profilePicture' as the field name.`);
        }
        return ResHandler.res(res).badRequest(`Upload Error: ${err.message}`);
    }

    if (err && err.message && err.message.includes("Boundary not found")) {
        return ResHandler.res(res).badRequest(
            "Invalid request format. Please send request as multipart/form-data"
        );
    }

    if (err) {
        return ResHandler.res(res).badRequest(err.message || "Invalid file upload");
    }

    next();
};