import { Branches } from "./branches";

const allTableDefs = {
    ...Branches
} as const;

export const Tables = { ...allTableDefs } as const;