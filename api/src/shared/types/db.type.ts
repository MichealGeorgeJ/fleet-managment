import type { Nullable, Optional } from "./common";

export interface IQueryResult<T = any> {
    rows: Array<T>;
    rowCount: Nullable<number>;
    first: Optional<T>;
    exists: boolean;
}