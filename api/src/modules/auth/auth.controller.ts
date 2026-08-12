import { BaseController } from "../../shared/base/base.controller";
import type { Request, Response } from "express";
import type { AuthService } from "./auth.service";

export class AuthController extends BaseController {
    
    constructor(private readonly authService: AuthService){
        super()
    }

    login = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.login(req.body);
        return this.response(res).ok(result)
    }

    verifyOtp = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.verifyOtp(req.body, req.deviceInfo);
        return this.response(res).ok(result)
    }

    refreshToken = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.refreshToken(req.body, req.deviceInfo);
        return this.response(res).ok(result)
    }

    forgotPassword = async (req: Request, res: Response): Promise<void> => {
        const result = await this.authService.forgotPassword(req.body);
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

}