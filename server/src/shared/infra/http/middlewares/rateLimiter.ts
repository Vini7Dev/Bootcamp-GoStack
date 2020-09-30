import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import redis from 'redis';

import AppError from '@shared/errors/AppError';

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD || undefined
});

const limiter = new RateLimiterRedis({
    storeClient: client,
    keyPrefix: 'rateLimit',
    points: 5,
    duration: 1
});

async function rateLimiter(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        await limiter.consume(req.ip);

        return next();
    } catch(err) {
        throw new AppError('Too many request.', 429);
    }
}

export default rateLimiter;