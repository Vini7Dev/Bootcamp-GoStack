import { RedisOptions } from 'ioredis';

interface CacheConfig {
    driver: string;

    config: {
        redis: RedisOptions;
    }
}

export default {
    driver: 'redis',

    config: {
        redis: {
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD || undefined
        }
    }
} as CacheConfig;