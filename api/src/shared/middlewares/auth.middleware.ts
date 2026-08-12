import { NextFunction, Request, Response } from "express";
import { ResponseHandler } from "../utils/res-handler";
import { StatusCode } from "../enum/status-code.enum";
import { PasetoUtils } from "../utils/paseto";
import { ITokenPayload } from "../../modules/auth/auth.type";
import { RedisKeys } from "../../core/redis/redis-key";
import { RedisService } from "../../core/redis/redis.service";

export default async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const resHandler = new ResponseHandler(res);

  if (!token) {
    return resHandler.sendError(StatusCode.UNAUTHORIZED, "No token provided");
  }

  try {
    const decoded = await PasetoUtils.verifyToken(token) as ITokenPayload;

    if (!decoded?.user?.id) {
      return resHandler.sendError(StatusCode.UNAUTHORIZED, "Invalid or expired token");
    }
    const redisKey = `${RedisKeys.USER_SESSION}:${decoded?.user?.id}:${decoded.id}`;
    const value = await new RedisService().get(redisKey);

    if (!value) {
      return resHandler.sendError(StatusCode.UNAUTHORIZED, "Session not found");
    }

    let session = JSON.parse(value) as ITokenPayload;
    if (session?.isRevoked) {
      return resHandler.sendError(StatusCode.UNAUTHORIZED, "Session is revoked");
    }

    req.session = decoded;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return resHandler.sendError(StatusCode.UNAUTHORIZED, "Invalid or expired token");
  }
}