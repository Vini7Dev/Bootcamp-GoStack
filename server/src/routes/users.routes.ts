import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (req, res) => {
    try {
        const data = req.body;

        const createUserService = new CreateUserService();

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

        return res.json(user);
    }catch(err) {
        return res.status(400).json({ error: err });
    }
});

export default usersRouter;