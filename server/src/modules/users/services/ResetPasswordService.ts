import { addHours, isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IServiceProps {
    password: string;
    token: string
}

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository,
        
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({ password, token }: IServiceProps): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token);

        if(!userToken) {
            throw new AppError('User token does not exists.');
        }

        const user = await this.usersRepository.findById(userToken.user_id);
    
        if(!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if(isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired');
        }
        
        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.update(user);
    }
}

export default ResetPasswordService;