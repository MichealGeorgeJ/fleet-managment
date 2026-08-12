import Nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { ENV } from '../config/env.constant';
import path from 'path';
import fs from 'fs';

dotenv.config();

export class EMailService {
    private transporter: Nodemailer.Transporter;
    private appName = ENV.APP_NAME;
    private websiteUrl = ENV.WEB_URL;
    constructor() {
        this.transporter = Nodemailer.createTransport({
            port: Number(ENV.EMAIL_PORT),
            secure: true,
            auth: {
                user: ENV.EMAIL_USER,
                pass: ENV.EMAIL_PASSWORD
            }
        });
    }

    private async send(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: `"FMS" <${ENV.EMAIL_USER}>`,
            to,
            subject,
            html
        });
    }

    private getTemplatePath(fileName: string): string {
        return path.join(process.cwd(), "assets", "templates", "emails", fileName);
    }

    private loadTemplate(fileName: string): string {
        return fs.readFileSync(this.getTemplatePath(fileName), "utf8");
    }

    async sendOtp(email: string, otp: number): Promise<void> {
        let html = this.loadTemplate("otp.html");

        html = html
            .replace(/{{appName}}/g, this.appName)
            .replace(/{{otp}}/g, otp.toString())
            .replace(/{{year}}/g, new Date().getFullYear().toString())
            .replace(/{{websiteUrl}}/g, this.websiteUrl);

        await this.send(email, "OTP Verification", html);
    }

}