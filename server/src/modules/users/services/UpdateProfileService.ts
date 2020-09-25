import { injectable, inject } from 'tsyringe';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import AppError from '@shared/errors/AppError';

interface IServiceProps {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ user_id, name, email, old_password, password }: IServiceProps): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if(!user) {
            throw new AppError('User not found.');
        }

        const emailExists = await this.usersRepository.findByEmail(email);

        if(!!emailExists && emailExists.id !== user_id) {
            throw new AppError('E-mail already in use.');
        }

        if(password && !old_password) {
            throw new AppError('You need inform the old password to set a new password.');
        }

        user.name = name;
        user.email = email;

        if(password && old_password) { 
            const checkoldpass = await this.hashProvider.compareHash(old_password, user.password);

            if(!checkoldpass) {
                throw new AppError('Wrong old password.');
            }

            user.password = await this.hashProvider.generateHash(password);
        }

        await this.usersRepository.update(user); 

        return user;
    }
}

export default UpdateProfileService;