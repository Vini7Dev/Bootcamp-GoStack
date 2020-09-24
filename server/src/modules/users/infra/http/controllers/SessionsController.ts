import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSectionService from '@modules/users/services/CreateSectionsService';

class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body;
    
            const createSectionService = container.resolve(CreateSectionService);
        
            const { user: { password, ...restUserData }, token } = await createSectionService.execute({
                email: data.email,
                password: data.password
            });
        
            return res.json([ restUserData, token ]);
        } catch(err) {
            return res.status(err.statusCode).json(err.message)
        }
    }
}

export default SessionsController;