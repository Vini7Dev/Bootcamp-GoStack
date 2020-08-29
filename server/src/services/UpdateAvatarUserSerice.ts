import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';

import uploadConfig from '../config/upload';

import User from '../models/User';
import AppError from '../errors/AppError';

interface ServiceProps {
    userId: string;
    avatarFileName: string;
}

class UpdateAvatarUserSerice {
    public async execute({ userId, avatarFileName }: ServiceProps): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { id: userId }
        });

        if(!user)
            throw new AppError(`Only authenticated users can change avatar.`, 401);

        if(user.avatar){
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const existsAvatar = await fs.promises.stat(userAvatarFilePath);

            if(existsAvatar){
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFileName;
        await userRepository.save(user);

        return user;
    }
}

export default UpdateAvatarUserSerice;