import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateSectionService from '@modules/users/services/CreateSectionsService';

class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;
    
            const createSectionService = container.resolve(CreateSectionService);
        
            const { user, token } = await createSectionService.execute({
                email,
                password
            });
        
            return res.json({ user: classToClass(user), token });
        } catch(error) {
            console.log(error);

            return res.status(error.statusCode).json(error.message);
        }
    }
}

export default SessionsController;