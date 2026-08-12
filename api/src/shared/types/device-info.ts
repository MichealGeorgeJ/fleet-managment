import { Nullable } from "./common";

export interface IDeviceInfo {
    ipAddress: string;
    userAgent: string;
    platform: string;
    deviceType: string;
    platformVersion: Nullable<string>;
    deviceName: Nullable<string>;
    browser: Nullable<string>;
}