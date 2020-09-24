import { Router } from 'express';

import sectionsRouter from '@modules/users/infra/http/routes/sections.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import appointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';

const routes = Router();

routes.use('/sections', sectionsRouter);
routes.use('/users', usersRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

export default routes;