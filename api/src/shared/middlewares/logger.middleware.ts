import { Request, Response, NextFunction } from "express";
import winston from "winston";

const { combine, timestamp, colorize, printf } = winston.format;

winston.addColors({
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
    verbose: "cyan",
    silly: "grey",
});

const consoleFormat = printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()} ${message}`;
});

const fileFormat = printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()} ${message}`;
});

export const logger = winston.createLogger({
    level: "debug",
    transports: [
        new winston.transports.Console({
            format: combine(
                colorize({ all: true }),
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                consoleFormat
            ),
        }),

        new winston.transports.File({
            filename: "admin-panel.log",
            format: combine(
                timestamp({
                    format: "YYYY-MM-DD HH:mm:ss",
                }),
                fileFormat
            ),
        }),
    ],
});

export const loggerMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const start = Date.now();

    res.on("finish", () => {
        const duration = Date.now() - start;

        const ip = req.deviceInfo?.ip

        const timestamp = new Intl.DateTimeFormat("en-IN", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }).format(new Date());

        const message = `[${timestamp}] [${req.method}] ${req.originalUrl} - ${res.statusCode} ${duration}ms [${ip}] [${req.deviceInfo?.deviceType} ${req.deviceInfo?.platform}]`;
        
        if (res.statusCode >= 500) {
            logger.error(message);
        } else if (res.statusCode >= 400) {
            logger.warn(message);
        } else {
            logger.info(message);
        }
    });

    next();
};