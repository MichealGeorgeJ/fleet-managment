import { Request, Response, NextFunction } from "express";
import { AuditService } from "../services/audit.service";
import { Modules } from "../enums/module.enum";
import { PermissionAction } from "../enums/permission.enum";
import { Nullable } from "../types/common";
import { Value } from "../utils/value";
import { KeyGen } from "../utils/key-gen";

export const AuditMiddleware = (
    module: Array<Modules>,
    action: Array<PermissionAction>,
    tableName: string
) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const requestId = KeyGen.randomUUID();
        const auditInfo = {
            adminId: Number(req.session.admin?.id),
            requestId: req.requestId,
            ipAddress: req.deviceInfo.ip,
            userAgent: req.deviceInfo.agent
        }

        req.requestId = requestId;
        req.auditInfo = auditInfo;

        res.locals.audit = [];

        res.locals.setAudit = ({
            rowId,
            oldValue = null,
            newValue = null,
        }: {
            rowId: number;
            oldValue?: Nullable<Record<string, any>>;
            newValue?: Nullable<Record<string, any>>;
        }) => {

            res.locals.audit!.push({
                rowId,
                oldValue,
                newValue
            });
        };

        res.locals.setAudits = (
            audits: Array<{
                rowId: number;
                oldValue?: Nullable<Record<string, any>>;
                newValue?: Nullable<Record<string, any>>;
            }>
        ) => {

            res.locals.audit!.push(...audits);
        };

        res.on("finish", async () => {
            if (res.statusCode < 200 || res.statusCode >= 300) return;

            if (!res.locals.audit?.length) return;

            try {
                const auditService = new AuditService();

                await Promise.all(
                    res.locals.audit.map(audit =>
                        auditService.create({
                            adminId: Number(req.session.admin?.id),
                            requestId,
                            module: module.join(','),
                            action: action.join(','),
                            tableName,
                            rowId: audit.rowId,
                            oldValue: Value.of(audit.oldValue).toNullableJson(),
                            newValue: Value.of(audit.newValue).toNullableJson(),
                            ipAddress: req.deviceInfo.ip,
                            userAgent: req.deviceInfo.agent
                        })
                    )
                );

            } catch (err) {
                console.error("Audit log error:", err);
            }
        });

        next();
    };
};