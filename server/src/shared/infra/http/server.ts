import 'reflect-metadata';

import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-error';

import routes from './routes';
import '@shared/infra/typeorm';
import '@shared/container';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if(err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: 'error',
            message: err.message
        });
    } else {
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error.'
        });
    }
});

app.listen(3333, () => {
    console.log('--> Server started on port 3333 <--');
});