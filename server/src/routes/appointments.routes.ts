import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../reporitories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthMiddleware from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthMiddleware);

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    const { provider_id, date } = req.body;

    const parsedDate = parseISO(date);
        
    const createAppointmentService = new CreateAppointmentService();
    
    const appointment = await createAppointmentService.execute({ 
        provider_id,
        date: parsedDate
    });
        
    return res.json(appointment);
})

export default appointmentsRouter;