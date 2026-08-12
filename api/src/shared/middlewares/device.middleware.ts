import { NextFunction, Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';

export function parseDevice(req: Request, _res: Response, next: NextFunction) {

  const parser = new UAParser(req.headers['user-agent']);
  const { os, device, browser } = parser.getResult();

  req.deviceInfo = {
    ipAddress: req.ip || req.socket.remoteAddress || "unknown",
    userAgent: req.headers["user-agent"]?.toString() || "Unknown",
    platform: os.name ?? 'Unknown',
    platformVersion: os.version ?? null,
    deviceType: device.type ?? 'desktop',
    deviceName: device.model ?? req.headers["x-device-name"]?.toString() ?? null,
    browser: browser.name ?? null,
  };

  next();
}