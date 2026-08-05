import { Tables } from "../../core/database/tables";
import { ISessionEvent } from "./auth.type";

export class SessionEventMapper {
    static toSessionEvent(row: Record<string, any>): ISessionEvent {
        const { columns } = Tables.sessionEvents;
        return {
            id: row[columns.id],
            sessionId: row[columns.sessionId],
            eventType: row[columns.eventType],
            createdAt: row[columns.createdAt],
        };
    }
}