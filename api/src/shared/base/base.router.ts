import { Router } from "express";

export abstract class BaseRouter {

    protected readonly router = Router();

    protected abstract register(): void;

    public getRouter(): Router {
        return this.router;
    }
}