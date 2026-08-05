import type { PoolClient } from "pg";
import { DatabaseService } from "../../core/database/services/db.service";

export interface QueryResult {
    rows: any[];
    rowCount: number;
}
export class BaseRepo {
    private readonly db: DatabaseService;

    constructor() {
        this.db = new DatabaseService();
    }

    protected async query(
        sql: string,
        params: Array<any> = []
    ): Promise<QueryResult> {
        const result = await this.db.query(sql, params);
        return {
            rows: result.rows,
            rowCount: result.rowCount ?? 0
        };
    }

    protected async transaction<T>(
        callback: (client: PoolClient) => Promise<T>
    ): Promise<T> {
        return this.db.transaction<T>(callback);
    }
}