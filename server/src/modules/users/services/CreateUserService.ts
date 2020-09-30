import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/Cacheprovider/model/ICacheProvider';

interface IServiceProps {
    name: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
        
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) {}

    public async execute({ name, email, password }: IServiceProps): Promise<User> {
        const checkEmailExists = await this.usersRepository.findByEmail(email);

        if(checkEmailExists)
            throw new AppError(`This email already used.`);

        const cryptedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: cryptedPassword
        });

        await this.cacheProvider.invalidadePrefix('providers-list');

        return user;
    }
}

export default CreateUserService;