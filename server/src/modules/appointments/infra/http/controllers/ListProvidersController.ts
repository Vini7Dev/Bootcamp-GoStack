import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListProvidersService from '../../../services/ListProvidersService';

class ListProvidersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;

        const listProviders = container.resolve(ListProvidersService);

        const providers = await listProviders.execute({ user_id });

        return res.json(classToClass(providers));
    }
}

export default ListProvidersController;