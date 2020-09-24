import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ListProvidersController from '../controllers/ListProvidersController';

const providersRouter = Router();
const listProvidersController = new ListProvidersController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', listProvidersController.index);

export default providersRouter;