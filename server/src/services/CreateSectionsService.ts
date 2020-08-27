import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

import User from '../models/User';

interface ServiceProps {
    email: string;
    password: string;
}

class CreateSectionsService {
    public async execute({email, password}: ServiceProps): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { email }
        });

        if(!user)
            throw new Error(`Incorrect email/password combination.`);

        const passwordMatched = await compare(password, user.password);

        if(!passwordMatched)
            throw new Error(`Incorrect email/password combination.`);

        return user;
    }
}

export default CreateSectionsService;