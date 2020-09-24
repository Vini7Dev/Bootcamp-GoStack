import { Router } from 'express';

import SessionsController from '@modules/users/infra/http/controllers/SessionsController';

const sectionsRouter = Router();

const sessionsController = new SessionsController();

sectionsRouter.post('/', sessionsController.create);

export default sectionsRouter;