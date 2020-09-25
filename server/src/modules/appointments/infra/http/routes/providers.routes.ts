import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import ListProvidersController from '../controllers/ListProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
const listProvidersController = new ListProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', listProvidersController.index);
providersRouter.get('/:provider_idid/day-availability', providerDayAvailabilityController.index);
providersRouter.get('/:provider_id/month-availability', providerMonthAvailabilityController.index);

export default providersRouter;