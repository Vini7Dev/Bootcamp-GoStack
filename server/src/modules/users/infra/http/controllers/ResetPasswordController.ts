import { Request, Response } from 'express';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { container } from 'tsyringe';

class ResetPasswordController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { password, token } = req.body;

            const resetPasswordService = container.resolve(ResetPasswordService);

            await resetPasswordService.execute({
                token,
                password
            });

            return res.status(204).json();
        } catch(error) {
            console.log(error);

            return res.status(400).json(error.message);
        }
    }
}

export default ResetPasswordController;