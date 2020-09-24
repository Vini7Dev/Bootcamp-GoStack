import { Router } from 'express';

import AppointmentsController from '@modules/appointments/infra/http/controllers/AppointmentsController';

import ensureAuthMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthMiddleware);

const appointmentsController = new AppointmentsController();

appointmentsRouter.post('/', appointmentsController.create)

export default appointmentsRouter;