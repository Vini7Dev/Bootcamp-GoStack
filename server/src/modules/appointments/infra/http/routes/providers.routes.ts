import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

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

providersRouter.get('/:provider_id/day-availability', 
    //celebrate({
    //    [Segments.PARAMS]: {
    //        provider_id: Joi.string().uuid().required
    //    }
    //}),
    providerDayAvailabilityController.index);

providersRouter.get('/:provider_id/month-availability',
    //celebrate({
    //    [Segments.PARAMS]: {
    //        provider_id: Joi.string().uuid().required
    //    }
    //}),
    providerMonthAvailabilityController.index);

export default providersRouter;