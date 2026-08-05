import { BaseRepo } from "../../shared/base/base.repo";
import { Tables } from "../../core/database/tables";
import { ICreateSession, ISession } from "./auth.type";
import { SessionMapper } from "./session.mapper";
import { NotFoundError } from "../../shared/errors/common/not-found.error";
import { Value } from "../../shared/utils/value";

export class SessionRepo extends BaseRepo {
    constructor() {
        super();
    }

    async upsert(request: ICreateSession): Promise<ISession> {
        const { columns, tableName } = Tables.sessions;

        const query = `
            INSERT INTO ${tableName} 
                (${columns.userId}, ${columns.deviceName}, ${columns.deviceFingerprint}, 
                ${columns.ipAddress}, ${columns.userAgent}, ${columns.platform}, 
                ${columns.refreshToken}, ${columns.lastUsedAt})
            VALUES ($1, $2, $3, $4, $5, $6, $7, now())
            ON CONFLICT (${columns.userId}, ${columns.deviceFingerprint}) 
            DO UPDATE SET 
                ${columns.refreshToken} = EXCLUDED.${columns.refreshToken},
                ${columns.lastUsedAt} = now(),
                ${columns.ipAddress} = EXCLUDED.${columns.ipAddress},
                ${columns.userAgent} = EXCLUDED.${columns.userAgent},
                ${columns.platform} = EXCLUDED.${columns.platform},
                ${columns.deviceName} = EXCLUDED.${columns.deviceName},
                ${columns.isRevoked} = false,
                ${columns.updatedAt} = now()
            RETURNING *;
        `;

        const result = await this.query(query, [
            request.userId,
            request.deviceName,
            request.deviceFingerprint,
            request.ipAddress,
            request.userAgent,
            request.platform,
            request.refreshToken,
        ]);

        return SessionMapper.toSession(result.rows[0]);
    }

    async getByToken(token: string): Promise<ISession> {
        const { columns, tableName } = Tables.sessions;
        const query = `SELECT * FROM ${tableName} WHERE ${columns.refreshToken} = $1`;
        const result = await this.query(query, [token]);
        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError("Session not found");
        }
        return SessionMapper.toSession(result.rows[0]);
    }

    async getAllByUserId(userId: string): Promise<ISession[]> {
        const { columns, tableName } = Tables.sessions;
        const query = `SELECT * FROM ${tableName} WHERE ${columns.userId} = $1`;
        const result = await this.query(query, [userId]);

        return result.rows.map((row: Record<string, any>) => SessionMapper.toSession(row));
    }

    async revokeRefreshToken(token: string): Promise<ISession> {
        const { columns, tableName } = Tables.sessions;
        const query = `UPDATE ${tableName} SET ${columns.isRevoked} = true, ${columns.updatedAt} = now() WHERE ${columns.refreshToken} = $1RETURNING *`;
        const result = await this.query(query, [token]);
        if (Value.of(result.rows[0]).isEmpty()) {
            throw new NotFoundError("Session not found");
        }
        return SessionMapper.toSession(result.rows[0]);
    }

}