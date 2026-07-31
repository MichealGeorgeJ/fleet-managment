import type { PoolClient, QueryResult, QueryResultRow } from "pg";
import { DatabaseService } from "../../core/database/services/db.service";

export class BaseRepo {
    private readonly db: DatabaseService;

    constructor() {
        this.db = new DatabaseService();
    }

    protected async query<T extends QueryResultRow = QueryResultRow>(
        sql: string,
        params: Array<any> = []
    ): Promise<QueryResult<T>> {
        return this.db.query<T>(sql, params);
    }

    protected async transaction<T>(
        callback: (client: PoolClient) => Promise<T>
    ): Promise<T> {
        return this.db.transaction<T>(callback);
    }
}