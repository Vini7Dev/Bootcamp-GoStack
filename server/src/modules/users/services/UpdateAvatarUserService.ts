import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

interface ServiceProps {
    userId: string;
    avatarFileName: string;
}

@injectable()
class UpdateAvatarUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) {}

    public async execute({ userId, avatarFileName }: ServiceProps): Promise<User> {
        const user = await this.usersRepository.findById(userId);

        if(!user)
            throw new AppError(`Only authenticated users can change avatar.`, 401);

        if(user.avatar){
            await this.storageProvider.deleteFile(user.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatarFileName);

        user.avatar = fileName;
        
        await this.usersRepository.update(user);

        return user;
    }
}

export default UpdateAvatarUserService;