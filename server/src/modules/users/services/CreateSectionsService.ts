import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';
import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IServiceProps {
    email: string;
    password: string;
}

interface IResponse {
    user: User,
    token: string
}

@injectable()
class CreateSectionsService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) {}

    public async execute({email, password}: IServiceProps): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError(`Incorrect email/password combination.`, 401);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if(!passwordMatched){
            throw new AppError(`Incorrect email/password combination.`, 401);
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn
        });

        return {
            user,
            token
        };
    }
}

export default CreateSectionsService;