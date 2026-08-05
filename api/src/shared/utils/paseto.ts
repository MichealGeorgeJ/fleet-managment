import { V4 } from 'paseto';
import nacl from 'tweetnacl';


export class PasetoUtils {
    private privateKey: Buffer;
    private publicKey: Buffer;

    constructor() {
        this.privateKey = this.loadPrivateKey();
        this.publicKey = this.loadPublicKey();
    }

    private loadPrivateKey(): Buffer {
        const keyB64 = process.env.PASETO_PRIVATE_KEY;
        if (!keyB64) {
            throw new Error('PASETO_PRIVATE_KEY is not set in .env');
        }

        const privateKey = Buffer.from(keyB64, 'base64');
        if (privateKey.length !== 64) {
            throw new Error('Invalid PASETO_PRIVATE_KEY: Must be 64 bytes (Ed25519)');
        }
        return privateKey;
    }

    private loadPublicKey(): Buffer {
        const keyB64 = process.env.PASETO_PUBLIC_KEY;
        if (!keyB64) {
            throw new Error('PASETO_PUBLIC_KEY is not set in .env');
        }

        const publicKey = Buffer.from(keyB64, 'base64');
        if (publicKey.length !== 32) {
            throw new Error('Invalid PASETO_PUBLIC_KEY: Must be 32 bytes');
        }
        return publicKey;
    }

    static async generateToken(payload: any): Promise<string> {

        const expiresInSeconds = 24 * 60 * 60 // 1 day

        const now = new Date();
        const expiresAt = new Date(now.getTime() + expiresInSeconds * 1000);

        const fullPayload = {
            ...payload,
            iat: now.toISOString(),
            nbf: now.toISOString(),
            exp: expiresAt.toISOString(),
        };
        const privateKey = new PasetoUtils().privateKey
        const token = await V4.sign(fullPayload, privateKey, {
            footer: { kid: 'paseto-key-1' }
        });

        return token;
    };

    static async verifyToken (token: string): Promise<any> {
        const publicKey = new PasetoUtils().publicKey
        try {
            const payload = await V4.verify(token, publicKey, {
                clockTolerance: "5m",
            });

            return payload;
        } catch (error: any) {
            console.error('PASETO Verification Failed:', error.message);
            throw new Error('Invalid or expired token');
        }
    };

    static async generateAndPrintKeys (): Promise<void> {
        console.log('Generating new PASETO v4 Ed25519 key pair...\n');

        const keyPair = nacl.sign.keyPair();

        const privateKeyBase64 = Buffer.from(keyPair.secretKey).toString('base64');
        const publicKeyBase64 = Buffer.from(keyPair.publicKey).toString('base64');

        console.log('══════════════════════════════════════════════');
        console.log('PASETO_PRIVATE_KEY=' + privateKeyBase64);
        console.log('PASETO_PUBLIC_KEY=' + publicKeyBase64);
        console.log('══════════════════════════════════════════════\n');

        console.log('Save these keys in your .env file!');
    };
}

PasetoUtils.generateAndPrintKeys();