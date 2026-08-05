import { Nullable } from "../../shared/types/common";

export interface ISession {
    id: Nullable<number>;
    userId: Nullable<number>;
    deviceName: Nullable<string>;
    deviceFingerprint: Nullable<string>;
    ipAddress: Nullable<string>;
    userAgent: Nullable<string>;
    platform: Nullable<string>;
    refreshToken: Nullable<string>;
    isRevoked: Nullable<boolean>;
    createdAt: Nullable<Date>;
    updatedAt: Nullable<Date>;
    lastUsedAt: Nullable<Date>;
}

export interface ICreateSession {
    userId: string;
    deviceName: string;
    deviceFingerprint: string;
    ipAddress: string;
    userAgent: string;
    platform: string;
    refreshToken: string;    
}

export interface ISessionEvent {
    id: Nullable<string>;
    sessionId: Nullable<string>;
    eventType: Nullable<string>;
    createdAt: Nullable<Date>;
}

