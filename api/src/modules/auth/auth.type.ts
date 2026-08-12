import { Nullable } from "../../shared/types/common";
import { IUser } from "../users/user.type";

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
    userId: number;
    deviceName: string;
    deviceFingerprint: string;
    ipAddress: string;
    userAgent: string;
    platform: string;
    refreshToken: string;    
}

export interface ISessionEvent {
    id: Nullable<number>;
    sessionId: Nullable<number>;
    eventType: Nullable<number>;
    createdAt: Nullable<Date>;
}

export interface ISessionEventCreate {
    sessionId: number;
    eventType: number;
}

export interface ITokenPayload {
    id?: Nullable<number>;
    deviceName: string;
    ipAddress: string;
    platform: string;
    userAgent: string;
    deviceFingerprint: string;
    isRevoked: boolean;
    user: IUser;
    iat?: string;
    nbf?: string;
    exp?: string;
}

