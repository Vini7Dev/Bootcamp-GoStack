import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersAppointmentsService from '../../../services/ListProvidersAppointmentsService';

class ProviderAppointmentsController {
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const provider_id = req.user.id;
            const { day, month, year } = req.query;

            const listProvidersAppointments = container.resolve(ListProvidersAppointmentsService);

            const appointments = await listProvidersAppointments.execute({
                provider_id,
                day: Number(day),
                month: Number(month),
                year: Number(year)
            });

            return res.json(classToClass(appointments));
        } catch(err) {
            return res.status(err.statusCode).json(err.message);
        }
    }
}

export default ProviderAppointmentsController;