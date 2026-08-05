import type { Nullable } from "../types/common";

export class Value {

    private readonly value: any;

    private constructor(value: any) {
        this.value = value;
    }

    // Factory method
    static of(value: any): Value {
        return new Value(value);
    }

    isNil(): boolean {
        return this.value === null || this.value === undefined;
    }

    isNotNil(): boolean {
        return !this.isNil();
    }

    isBoolean(): boolean {
        return this.isNotNil() && typeof this.value === "boolean";
    }

    isZero(): boolean {
        return this.isNotNil() && typeof this.value === "number" && this.value === 0;
    }

    isString(): boolean {
        return this.isNotNil() && typeof this.value === "string";
    }

    isNumber(): boolean {
        return this.isNotNil() && typeof this.value === "number" && !Number.isNaN(this.value);
    }

    isInteger(): boolean {
        return this.isNotNil() && Number.isInteger(this.value);
    }

    isFloat(): boolean {
        return this.isNotNil() && !Number.isInteger(this.value);
    }

    isArray(): boolean {
        return this.isNotNil() && Array.isArray(this.value);
    }

    isObject(): boolean {
        return this.isNotNil() && typeof this.value === "object" && !Array.isArray(this.value);
    }

    isEmpty(): boolean {
        if (this.isNil()){
            return true;
        }

        if (this.isString()){
            return this.value.trim().length === 0;
        }

        if (this.isArray()){
            return this.value.length === 0;
        }

        if (this.isObject()){
            return Object.keys(this.value).length === 0;
        }

        // numbers & booleans are never "empty"
        if (this.isNumber() || this.isBoolean()){
            return false;
        }

        return false;
    }

    isNotEmpty(){
        return !this.isEmpty();
    }

    equalTo(value: any): boolean{
        return this.value === value;
    }
    notEqualTo(value: any): boolean{
        return this.value !== value;
    }

    toBoolean(){
        return this.isNotNil() && (this.value === 1 || this.value === "1" || this.value === true);
    }

    toNullableString(): Nullable<string>{
        return this.isNotNil() ? String(this.value) : null;
    }

    toNullableNumber(): Nullable<number>{
        if (this.isInteger() || this.isFloat()){
            return Number(this.value);
        }else {
            return null;
        }
    }

    toNullableBoolean(): Nullable<boolean> {
        if (this.isNil()) {
            return null;
        }
        
        if (this.value === true || this.value === 1 || this.value === 'true') {
            return true;
        }

        if (this.value === false || this.value === 0 || this.value === 'false') {
            return false;
        }

        return null;
    }

    toNullableArray(): Nullable<Array<string>> {
        if (this.isNil()) {
            return null;
        }
        if (this.isArray()) {
            return this.value;
        }
        return null;
    }

    toNumber(): number{
        if (this.isInteger() || this.isFloat()){
            return Number(this.value);
        }else {
            return 0;
        }
    }

    toString(): string{
        if (this.isString()){
            return String(this.value);
        }else {
            return "";
        }
    }

    toFloat(): number{
        if (this.isFloat()){
            return parseFloat(this.value);
        }else {
            return 0;
        }
    }

    toDate(): Date {
        if (this.isNil()){
            return new Date(0);
        }
        return new Date(this.value);
    }

    toNullableDate(): Nullable<Date> {
        if (this.isNil()){
            return null;
        }
        return new Date(this.value);
    }

    toNullableJson(): Nullable<string> {
        if (this.isNil()) {
            return null;
        }
        try {
            return JSON.stringify(this.value);
        } catch (e) {
            return null;
        }
    }

    fromJson(): any{
        try {
            return JSON.parse(this.value);
        } catch (e) {
            return null;
        }
    }

}