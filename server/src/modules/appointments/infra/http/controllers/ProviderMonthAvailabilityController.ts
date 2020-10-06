import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '../../../services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
    public async index(req: Request, res: Response): Promise<Response> {
        try {
            const { provider_id } = req.params;
            const { month, year } = req.query;

            const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityService);
    
            const availability = await listProviderMonthAvailability.execute({
                provider_id,
                month: Number(month),
                year: Number(year)
            });
    
            return res.json(availability);
        } catch(err) {
            return res.status(err.statusCode).json(err.message);
        }
    }
}

export default ProviderMonthAvailabilityController;