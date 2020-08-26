import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

interface ServiceProps {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: ServiceProps): Promise<User> {
        const usersRepository = getRepository(User);

        const checkEmailExists = await usersRepository.findOne({
            where: { email },
        });

        if(checkEmailExists)
            throw new Error(`This email already used.`);

        const cryptedPassword = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: cryptedPassword
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;