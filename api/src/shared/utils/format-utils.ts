import type { ZodError } from "zod";

export class FormatUtils {
    static formatZodError(e: ZodError): string{
        return e.issues.map(function (err): string {
            return `${err.path.join(".")}: ${err.message}`;
        }).join(", ");
    }

    static isSnakeCase(value: string): boolean {
        return /^([a-z]+)(_[a-z]+)*$/.test(value);
    }

    static parseForeignKeyError(error: any) {
    const match = error.cause?.detail?.match(/\((.*?)\)=\((.*?)\)/);

    return {
        column: match?.[1] ?? null,
        value: match?.[2] ?? null,
        constraint: error.cause?.constraint ?? null,
    };
}
}