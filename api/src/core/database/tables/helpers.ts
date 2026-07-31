export interface TableSchema<
    TableName extends string = string,
    Columns extends Record<string, string> = Record<string, string>
> {
    tableName: TableName;
    columns: Columns;
}

export function defineTable<
    const TableName extends string,
    const Columns extends Record<string, string>
>(tableName: TableName, columns: Columns): TableSchema<TableName, Columns> {
    return {tableName, columns};
}