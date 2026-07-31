import { BaseRouter } from "../../shared/base/base.router";
import { asyncHandler } from "../../shared/utils/async-handler";
import type { AuthController } from "./auth.controller";

export class AuthRouter extends BaseRouter {

    constructor(private readonly controller: AuthController) {
        super();
        this.register();
    }

    protected register(): void {
        this.router.get("/register", asyncHandler(this.controller.register));
    }
}
