import { BaseController } from "../../shared/base/base.controller";
import type { Request, Response } from "express";
import type { UserService } from "./user.service";

export class UserController extends BaseController {
    
    constructor(private readonly userService: UserService) {
        super();
    }



    create = async (req: Request, res: Response): Promise<void> => {
        const user = await this.userService.create(req.body);
        return this.response(res).created(user);
    }

    update = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const user = await this.userService.update(Number(id), req.body);
        return this.response(res).ok({ data: user });
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const user = await this.userService.delete(Number(id), 0);
        return this.response(res).ok({ data: user });
    }

    getById = async (req: Request, res: Response): Promise<void> => {
        const { id } = req.params;
        const user = await this.userService.findById(Number(id));
        return this.response(res).ok(user);
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const users = await this.userService.getAll();
        return this.response(res).ok(users);
    }
}
