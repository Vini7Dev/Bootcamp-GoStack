import { Request, Response } from 'express';
import CreateUser from './services/CreateUser';
import createUser from './services/CreateUser';

export function index(req: Request, res: Response) {

    const user = createUser({
        email: 'vinicius@gmail.com',
        password: '123456789',
        techs: [
            'Node',
            'ReactJS',
            'React Native',
            { title: 'JavaScript', experience: 100 }
        ]
    });

    return res.json(user);
}