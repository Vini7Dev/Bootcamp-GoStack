import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../reporitories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (req, res) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();

    return res.json(appointments);
});

appointmentsRouter.post('/', async (req, res) => {
    try {
        const { provider_id, date } = req.body;

        const parsedDate = parseISO(date);
        
        const createAppointmentService = new CreateAppointmentService();
    
        const appointment = await createAppointmentService.execute({ 
            provider_id,
            date: parsedDate
        });
        
        return res.json(appointment);
    }catch(err) {
        return res.status(400).json({ error: err.message });
    }
})

export default appointmentsRouter;