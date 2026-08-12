import { Tables } from "../../core/database/tables";
import { BaseRepo } from "../../shared/base/base.repo";
import { ISessionEvent, ISessionEventCreate } from "./auth.type";
import { SessionEventMapper } from "./session-event.mapper";

export class SessionEventRepo extends BaseRepo {

    async create(event: ISessionEventCreate): Promise<ISessionEvent> {
        const { columns, tableName } = Tables.sessionEvents;

        const query = `
            INSERT INTO ${tableName} 
                (${columns.sessionId}, ${columns.eventType})
            VALUES ($1, $2)
            RETURNING *;
        `;

        const result = await this.query(query, [event.sessionId, event.eventType]);
        return SessionEventMapper.toSessionEvent(result.rows[0]);
    }

    async getBySessionId(sessionId: string): Promise<ISessionEvent[]> {
        const { columns, tableName } = Tables.sessionEvents;
        const query = `SELECT * FROM ${tableName} WHERE ${columns.sessionId} = $1`;
        const result = await this.query(query, [sessionId]);

        return result.rows.map((row: Record<string, any>) => SessionEventMapper.toSessionEvent(row));
    }

}