import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(req: Request, res:Response , next: NextFunction): void {
    const { authorization } = req.headers;

    if(!authorization)
        throw new Error('JTW token is missing.');

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
        throw new Error('Invalid JWT token.');
    }
}
