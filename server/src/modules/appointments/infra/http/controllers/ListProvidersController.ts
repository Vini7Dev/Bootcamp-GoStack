import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '../../../services/ListProvidersService';

class ListProvidersController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;

        const listProviders = container.resolve(ListProvidersService);

        const providers = await listProviders.execute({ user_id });

        return res.json(providers);
    }
}

export default ListProvidersController;