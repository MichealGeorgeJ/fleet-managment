import { NextFunction, Request, Response } from "express";
import { Value } from "../utils/value";
import { PermissionAction } from "../enums/permission.enum";
import { Modules } from "../enums/module.enum";
import { PermissionRepository } from "../repositories/permission.repository";
import { RoleRepository } from "../repositories/role.repository";

export default function permissionMiddleware(modules: Array<Modules>, requiredPermissionActions: Array<PermissionAction>) {

    return async (req: Request, res: Response, next: NextFunction) => {
        const key = `${RedisKeys.ADMIN_PERMISSIONS}:${req?.session?.admin?.id}`;
        let data = await RedisService.get(key);

        if (Value.of(data).isEmpty()) {
            const permissionRepo = new PermissionRepository()
            const roleRepo = new RoleRepository()

            data = {
                permissions: (await permissionRepo.getByAdminId(req?.session?.admin?.id!)).map((p) => p.code),
                roles: (await roleRepo.getByAdminId(req?.session?.admin?.id!)).map((r) => r.name)
            }
            await RedisService.set(key, data, 86400);
        }
        if (data.roles.includes("Master_Admin")) {
            return next();
        }
console.log(data);
        const requiredPermissions = modules.flatMap(module => requiredPermissionActions.map(action => `${module}.${action}`))
        const hasPermission = requiredPermissions.every(permission => data.permissions.includes(permission));
        console.log(hasPermission);
        if (!hasPermission) {
            return ResHandler.res(res).forbidden("Access denied");
        }

        next();
    }
}