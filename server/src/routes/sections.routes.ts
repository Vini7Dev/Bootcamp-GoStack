import { Router } from 'express';

import CreateSectionService from '../services/CreateSectionsService';

const sectionsRouter = Router();

sectionsRouter.post('/', async (req, res) => {
    try{
        const data = req.body;

        const createSectionService = new CreateSectionService();

        const { password, ...restUserData } = await createSectionService.execute({
            email: data.email,
            password: data.password
        });

        return res.json(restUserData);
    }catch(err) {
        return res.status(400).json({ error: err });
    }
});

export default sectionsRouter;