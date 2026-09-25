import { BaseController } from "../../shared/base/base.controller";
import type { Request, Response } from "express";
import type { AuthService } from "./auth.service";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import { ENV } from "../../core/config/env.constant";

export class AuthController extends BaseController {

    constructor(private readonly authService: AuthService) {
        super()
    }

    login = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.login(req.body);
        return this.response(res).ok(result)
    }

    verifyOtp = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.verifyOtp(req.body, req.deviceInfo);
        await this.handleCookies(res, result)
        return this.response(res).ok(result)
    }

    refreshToken = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.refreshToken(req.body, req.deviceInfo);
        await this.handleCookies(res, result);

        return this.response(res).ok(result)
    }

    forgotPassword = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.forgotPassword(req.body.email);
        return this.response(res).ok(result)
    }

    resetPassword = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.resetPassword(req.body);
        return this.response(res).ok(result)
    }

    logout = async (req: Request, res: Response): Promise<void> => {
        await this.authService.logout(req.body);
        return this.response(res).noContent()
    }

    private handleCookies = async (res: Response, { accessToken, refreshToken }: { accessToken: string, refreshToken?: string }) => {

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: ENV.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: APP_CONSTANTS.ACCESS_TOKEN_EXP,
        });

        if (refreshToken) {
            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: ENV.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: APP_CONSTANTS.REFRESH_TOKEN_EXP,
            });
        }

    }

}