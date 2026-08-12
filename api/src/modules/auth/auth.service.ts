import { SessionEventRepo } from "./session-event.repo";
import { SessionRepo } from "./session.repo";
import { UserService } from "../users/user.service";
import { LoginRequest, ResetPasswordRequest, VerifyOtpRequest } from "./auth.schema";
import { PasswordUtil } from "../../shared/utils/password";
import { EMailService } from "../../core/e-mail/e-mail.service";
import { KeyGen } from "../../shared/utils/key-gen";
import { BadRequestError } from "../../shared/errors/common/bad-request.error";
import { RedisKeys } from "../../core/redis/redis-key";
import { RedisService } from "../../core/redis/redis.service";
import { StatusEnum } from "../../shared/enum/status.enum";
import { Value } from "../../shared/utils/value";
import { GoneError } from "../../shared/errors/common/gone.error";
import { ITokenPayload } from "./auth.type";
import { IDeviceInfo } from "../../shared/types/device-info";
import { PasetoUtils } from "../../shared/utils/paseto";
import { APP_CONSTANTS } from "../../shared/constants/app.constant";
import { IUser } from "../users/user.type";
import { ForbidenError } from "../../shared/errors/common/forbiden.error";
import { SessionEventEnum } from "../../shared/enum/session-event.enum";
import { Nullable } from "../../shared/types/common";

export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly eMailService: EMailService,
        private readonly redisService: RedisService,
        private readonly sessionRepo: SessionRepo,
        private readonly sessionEventRepo: SessionEventRepo
    ) {}

    async login(data: LoginRequest): Promise<string> {
        const { email, password } = data

        const user = await this.userService.findByEmail(email)
        const isValid = await PasswordUtil.compare(user.passwordHash!, password)

        if (isValid) {
            return await this.handleSendOtp(email);
        }

        throw new BadRequestError("Invalid email or password")
    }

    async verifyOtp(data: VerifyOtpRequest, deviceInfo: IDeviceInfo): Promise<{ accessToken: string, refreshToken: string }> {
        const { key, otp } = data;

        const parsedOtpData = await this.handleVerifyOtp(key, otp);
        const tokenPayload = await this.generateTokenPayload(parsedOtpData.user, deviceInfo);

        const refreshToken = await PasetoUtils.generateToken(tokenPayload, APP_CONSTANTS.REFRESH_TOKEN_EXP);

        const session = await this.sessionRepo.upsert({
            ...tokenPayload,
            refreshToken,
            userId: parsedOtpData.user.id!,
        });

        const sessionId = session.id!;
        const payloadWithSessionId = { ...tokenPayload, id: sessionId };
        const redisKey = `${RedisKeys.USER_SESSION}:${parsedOtpData.user.id}:${sessionId}`;

        // Run independent post-session operations in parallel
        const [accessToken] = await Promise.all([
            PasetoUtils.generateToken(payloadWithSessionId, APP_CONSTANTS.ACCESS_TOKEN_EXP),
            this.sessionEventRepo.create({
                sessionId,
                eventType: SessionEventEnum.LOGIN,
            }),
            this.redisService.set(
                redisKey,
                JSON.stringify(payloadWithSessionId),
                APP_CONSTANTS.ACCESS_TOKEN_EXP,
            ),
        ]);

        return { accessToken, refreshToken };
    }

    async refreshToken(refreshToken: string, deviceInfo: IDeviceInfo): Promise<string> {
        const [session, decodedToken] = await Promise.all([
            this.sessionRepo.getByRefreshToken(refreshToken),
            PasetoUtils.verifyToken(refreshToken),
        ]);

        if (session.isRevoked) {
            throw new ForbidenError("Session is revoked");
        }

        if (decodedToken.exp < Date.now()) {
            await this.sessionRepo.revokeRefreshToken(refreshToken);
            throw new GoneError("Session has expired");
        }

        const user = await this.userService.findById(session.userId!);
        const tokenPayload = await this.generateTokenPayload(user, deviceInfo);

        const sessionId = session.id!;
        const payloadWithSessionId = { ...tokenPayload, id: sessionId };
        const redisKey = `${RedisKeys.USER_SESSION}:${user.id}:${sessionId}`;

        const [accessToken] = await Promise.all([
            PasetoUtils.generateToken(payloadWithSessionId, APP_CONSTANTS.ACCESS_TOKEN_EXP),
            this.sessionEventRepo.create({
                sessionId,
                eventType: SessionEventEnum.REFRESH,
            }),
            this.redisService.set(
                redisKey,
                JSON.stringify(payloadWithSessionId),
                APP_CONSTANTS.ACCESS_TOKEN_EXP,
            ),
        ]);

        return accessToken;
    }

    async forgotPassword(email: string): Promise<string> {
        await this.userService.findByEmail(email)
        return await this.handleSendOtp(email);
    }

    async resetPassword(data: ResetPasswordRequest): Promise<void> {

        const { key, otp, password } = data

        const parsedOtpData = await this.handleVerifyOtp(key, otp);

        const user = await this.userService.findByEmail(parsedOtpData.email);

        const hashedPassword = await PasswordUtil.hash(password);
        
        await Promise.all([
            this.userService.updatePassword(user.id!, hashedPassword),
            this.redisService.del(`${RedisKeys.EMAIL_OTP(key)}`)
        ])
        await this.sessionRepo.revokeAllSessions(user.id!)
    }

    async logout(refreshToken: string) {
        const session = await this.sessionRepo.revokeRefreshToken(refreshToken)
        await this.sessionEventRepo.create({sessionId: session.id!, eventType: SessionEventEnum.LOGOUT})
    }

    private async handleVerifyOtp(key: string, otp: string): Promise<any> {

        const redisKey = `${RedisKeys.EMAIL_OTP(key)}`;
        const otpData = await this.redisService.get(redisKey)

        if (Value.of(otpData).isEmpty()) {
            throw new GoneError("Otp has expired")
        }

        const parsedOtpData = JSON.parse(otpData!);

        if (parsedOtpData.otp !== otp) {
            throw new BadRequestError("Invalid otp")
        }

        return parsedOtpData
    }

    private async handleSendOtp(email: string) {
        const otp = KeyGen.rand(100000, 999999)
        await this.eMailService.sendOtp(email, otp)

        const key = KeyGen.randomUUID();
        const redisKey = `${RedisKeys.EMAIL_OTP(key)}`;

        const otpData = this.generateOtpData(email, otp)

        // Store OTP for 5 minutes
        await this.redisService.set(redisKey, JSON.stringify(otpData), 300);

        return key;
    }
    
    private async generateOtpData(email: string, otp: number): Promise<any> {
         return {
                email,
                otp,
                maxAttempts: 3,
                currentAttempts: 0,
                createdAt: new Date(),
                expiresAt: new Date(Date.now() + 60 * 1000),
                status: StatusEnum.ACTIVE,
            };
    }

    private async generateTokenPayload(user: IUser, deviceInfo: IDeviceInfo, sessionId: Nullable<number> = null): Promise<ITokenPayload> {
        return {
            id: sessionId,
            deviceName: deviceInfo.deviceName!,
            ipAddress: deviceInfo.ipAddress!,
            platform: deviceInfo.platform!,
            userAgent: deviceInfo.userAgent!,
            deviceFingerprint: `${deviceInfo.platform || ''}:${deviceInfo.deviceName || ''}:${deviceInfo.userAgent?.substring(0, 100) || ''}`,
            isRevoked: false,
            user: user,
          
        }
    }


}