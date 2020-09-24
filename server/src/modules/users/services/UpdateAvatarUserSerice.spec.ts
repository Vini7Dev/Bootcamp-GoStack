import FakeStorageAvatar from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import FakeUsersRepository from '../repositories/fakes/FakeUsersReposutory';
import UpdateAvatarUserService from './UpdateAvatarUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeStorageAvatar: FakeStorageAvatar;
let updateAvatarUser: UpdateAvatarUserService;

describe('UpdateAvatarUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeStorageAvatar = new FakeStorageAvatar();
        updateAvatarUser = new UpdateAvatarUserService(fakeUsersRepository, fakeStorageAvatar);
    });

    it('should be able to update user avatar', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        await updateAvatarUser.execute({
            userId: user.id,
            avatarFileName: 'avatar.jpg'
        });

        expect(user.avatar).toBe('avatar.jpg');
    });

    it('should not be able to update avatar if the user is not exist', async () => {
        await expect(
            updateAvatarUser.execute({
                userId: 'nonexistent',
                avatarFileName: 'avatar.jpg'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should delete old avatar when updating new one', async () => {
        const deleteFile = jest.spyOn(fakeStorageAvatar, 'deleteFile');

        const user = await fakeUsersRepository.create({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        await updateAvatarUser.execute({
            userId: user.id,
            avatarFileName: 'avatar.jpg'
        });

        await updateAvatarUser.execute({
            userId: user.id,
            avatarFileName: 'avatar2.jpg'
        });

        expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
        expect(user.avatar).toBe('avatar2.jpg');
    });
})