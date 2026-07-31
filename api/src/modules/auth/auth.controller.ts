import { BaseController } from "../../shared/base/base.controller";
import type { Request, Response } from "express";
import type { AuthService } from "./auth.service";

export class AuthController extends BaseController {
    
    constructor(private readonly authService: AuthService){
        super()
    }

    register = async (req: Request, res: Response): Promise<void> => {
        return this.response(res).ok({ message: "data fetched successfully" })
    }



}