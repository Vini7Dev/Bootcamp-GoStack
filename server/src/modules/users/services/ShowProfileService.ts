import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IServiceProps {
    user_id: string;
}

@injectable()
class ShowProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ user_id }: IServiceProps): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found.');
        }

        user.password = '';

        return user;
    }
}

export default ShowProfileService;