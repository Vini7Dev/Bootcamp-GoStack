import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

class AppointmentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const user_id = req.user.id;
        const { provider_id, date } = req.body;
            
        const createAppointmentService = container.resolve(CreateAppointmentService);
        
        const appointment = await createAppointmentService.execute({
            user_id, 
            provider_id,
            date
        });
            
        return res.json(appointment);
    }
}

export default AppointmentsController;