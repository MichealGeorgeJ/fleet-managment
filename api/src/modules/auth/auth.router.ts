import { BaseRouter } from "../../shared/base/base.router";
import { asyncHandler } from "../../shared/utils/async-handler";
import type { AuthController } from "./auth.controller";

export class AuthRouter extends BaseRouter {

    constructor(private readonly controller: AuthController) {
        super();
        this.register();
    }

    protected register(): void {
        const c = this.controller
        this.router.post("/login", asyncHandler(c.login.bind(c)))
        this.router.post("/verify-otp", asyncHandler(c.verifyOtp.bind(c)))
        this.router.post("/refresh-token", asyncHandler(c.refreshToken.bind(c)))
        this.router.post("/forgot-password", asyncHandler(c.forgotPassword.bind(c)))
        this.router.post("/reset-password", asyncHandler(c.resetPassword.bind(c)))
        this.router.post("/logout", asyncHandler(c.logout.bind(c)))
    }
}
