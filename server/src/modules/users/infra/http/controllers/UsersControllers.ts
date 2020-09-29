import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

class UsersControllers {
    public async create(req: Request, res: Response): Promise<Response> {
        const data = req.body;

        const createUserService = container.resolve(CreateUserService);
    
        const { id, name, email, created_at, updated_at } = await createUserService.execute({
            name: data.name,
            email: data.email,
            password: data.password
        });
    
        const user = {
            id,
            name,
            email,
            created_at,
            updated_at
        };
    
        return res.json(classToClass(user));
    }
}

export default UsersControllers;