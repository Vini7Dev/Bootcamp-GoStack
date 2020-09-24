import { Request, Response } from 'express';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import { container } from 'tsyringe';

class ForgotPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email } = req.body;

            const sendForgotPasswordEmailService = container.resolve(SendForgotPasswordEmailService);

            await sendForgotPasswordEmailService.execute({
                email
            });

            return res.status(204).json();
        } catch(err) {
            return res.json(err.message)
        }
    }
}

export default ForgotPasswordController;