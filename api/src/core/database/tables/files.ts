import { defineTable } from "./helpers";

export class Files {

    static readonly files = defineTable("files", {
        id: 'id',
        objectKey: 'object_key',
        isTemp: 'is_temp',
    });


}