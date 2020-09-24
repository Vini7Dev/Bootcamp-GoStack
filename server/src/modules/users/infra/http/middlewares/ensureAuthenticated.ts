import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(req: Request, res:Response , next: NextFunction): void {
    const { authorization } = req.headers;

    if(!authorization)
        throw new AppError('JTW token is missing.', 401);

    const [ , token ] = authorization.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        req.user = {
            id: sub
        };

        return next();
    }catch(err) {
        console.log(err);
        throw new AppError('Invalid JWT token.', 401);
    }
}
