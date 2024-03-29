import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

import ensureAuthMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthMiddleware);

const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.post('/', celebrate({
    [Segments.BODY]: {
        provider_id: Joi.string().uuid().required(),
        date: Joi.date()
    }
}), appointmentsController.create);


appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;