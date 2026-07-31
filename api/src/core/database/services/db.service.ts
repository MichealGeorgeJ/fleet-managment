import { Pool, type PoolClient, type QueryResult, type QueryResultRow, DatabaseError } from "pg";
import { ENV } from "../../../shared/constants/env.constant";
import { PostgresErrorMapper } from "../../../shared/errors/postgres/postgres-error.mapper";

export class DatabaseService {
    private readonly pool: Pool;

    constructor() {
        this.pool = new Pool({
            host: ENV.DB_HOST,
            port: ENV.DB_PORT,
            user: ENV.DB_USER,
            password: ENV.DB_PASSWORD,
            database: ENV.DB_NAME,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
            ssl: {
                rejectUnauthorized: false
            }
        });

        this.pool.on("connect", () => {
            console.log("PostgreSQL connected");
        });

        this.pool.on("error", (err) => {
            console.error("PostgreSQL Pool Error:", err);
        });
    }

    async query<T extends QueryResultRow = QueryResultRow>(
        sql: string,
        params: Array<any> = []
    ): Promise<QueryResult<T>> {
        try {
            return await this.pool.query<T>(sql, params);
        } catch (e) {
            if (e instanceof DatabaseError) {
                throw PostgresErrorMapper.map(e);
            }
            throw e;
        }
    }

    async transaction<T>(
        callback: (client: PoolClient) => Promise<T>
    ): Promise<T> {
        const client = await this.pool.connect();

        try {
            await client.query("BEGIN");

            const result = await callback(client);

            await client.query("COMMIT");

            return result;
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release();
        }
    }

    async close(): Promise<void> {
        await this.pool.end();
    }
}