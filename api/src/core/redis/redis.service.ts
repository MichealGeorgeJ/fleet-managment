import { createClient, type RedisClientType } from 'redis';
import { ENV } from '../config/env.constant';
import { RedisError } from '../../shared/errors/common/redis.error';

export class RedisService {
    private client: RedisClientType;

    constructor() {
        this.client = createClient({
            url: ENV.REDIS_URL!
        });

        this.client.on('connect', () => {
            console.log('Redis connected');
        });

        this.client.on('error', (err) => {
            console.error('Redis error:', err);
        });
    }

    async set(key: string, value: string, ttl?: number) {
        try {
            await this.client.set(key, value, ttl ? { EX: ttl } : undefined);
        } catch (error) {
            throw new RedisError('Failed to set value in Redis');
        }
    }

    async get(key: string) {
        try {
            const value = await this.client.get(key);
            return value;
        } catch (error) {
            throw new RedisError('Failed to get value from Redis');
        }
    }

    async del(key: string) {
        try {
            await this.client.del(key);
        } catch (error) {
            throw new RedisError('Failed to delete key from Redis');
        }
    }

    async exists(key: string) {
        try {
            return await this.client.exists(key);
        } catch (error) {
            throw new RedisError('Failed to check key existence in Redis');
        }
    }

    async expire(key: string, ttl: number) {
        try {
            return await this.client.expire(key, ttl);
        } catch (error) {
            throw new RedisError('Failed to set key expiration in Redis');
        }
    }

    async ttl(key: string) {
        try {
            return await this.client.ttl(key);
        } catch (error) {
            throw new RedisError('Failed to get key TTL in Redis');
        }
    }

    async setNX(key: string, value: string, ttl?: number) {
        try {
            const result = await this.client.set(key, value, {
                NX: true,
                ...(ttl ? { EX: ttl } : {})
            });
            return result === 'OK';
        } catch (error) {
            throw new RedisError('Failed to set key with NX in Redis');
        }
    }

    async flushAll() {
        try {
            await this.client.flushAll();
        } catch (error) {
            throw new RedisError('Failed to flush all keys from Redis');
        }
    }

    async connect() {
        try {
            await this.client.connect();
        } catch (error) {
            throw new RedisError('Failed to connect to Redis');
        }
    }

    async disconnect() {
        try {
            await this.client.quit();
        } catch (error) {
            throw new RedisError('Failed to disconnect from Redis');
        }
    }
}