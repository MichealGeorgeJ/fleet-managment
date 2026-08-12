declare global {

    namespace Express {
        interface Request {
            session: ISession;
            deviceInfo: IDeviceInfo;
            requestId: string;
            auditInfo?: IAuditLogInfo;
        }
        interface Locals {
            audit?: Array<{
                rowId: number;
                oldValue?: Nullable<Record<string, any>>;
                newValue?: Nullable<Record<string, any>>;
            }>;

            setAudit: (
                audit: {
                    rowId: number;
                    oldValue?: Nullable<Record<string, any>>;
                    newValue?: Nullable<Record<string, any>>;
                }
            ) => void;

            setAudits: (
                audits: Array<{
                    rowId: number;
                    oldValue?: Nullable<Record<string, any>>;
                    newValue?: Nullable<Record<string, any>>;
                }>
            ) => void;
        }
    }
}

export { };