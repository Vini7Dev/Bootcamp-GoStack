import { Router } from 'express';

import sectionsRouter from './sections.routes';
import usersRouter from './users.routes';
import appointmentsRouter from './appointments.routes';

const routes = Router();

routes.use('/sections', sectionsRouter);
routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);

export default routes;