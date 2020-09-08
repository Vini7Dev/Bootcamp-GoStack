import { Router } from 'express';

import CreateSectionService from '../services/CreateSectionsService';

const sectionsRouter = Router();

sectionsRouter.post('/', async (req, res) => {
    try {
        const data = req.body;

        const createSectionService = new CreateSectionService();
    
        const { user: { password, ...restUserData }, token } = await createSectionService.execute({
            email: data.email,
            password: data.password
        });
    
        return res.json([ restUserData, token ]);
    } catch(err) {
        return res.status(err.statusCode).json(err.message)
    }
});

export default sectionsRouter;