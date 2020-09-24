import FakeUsersRepository from '../repositories/fakes/FakeUsersReposutory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileUser', () => {
    beforeEach(() => {
        usersRepository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        updateProfileService = new UpdateProfileService(usersRepository, hashProvider);
    });

    it('should be able to update profile', async () => {
        const user = await usersRepository.create({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'New Name',
            email: 'newemail@example.com',
        });

        expect(updatedUser.name).toBe('New Name');
        expect(updatedUser.email).toBe('newemail@example.com');
    });

    it('should not be able to change another user email', async () => {
        await usersRepository.create({
            name: 'User1',
            email: 'user1@example.com',
            password: 'pass123'
        });

        const user = await usersRepository.create({
            name: 'User2',
            email: 'user2@example.com',
            password: 'pass123'
        });

        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'User2',
                email: 'user1@example.com',
            }
        )).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update the password', async () => {
        const user = await usersRepository.create({
            name: 'User1',
            email: 'user1@example.com',
            password: 'pass123'
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'Name',
            email: 'email@example.com',
            old_password: 'pass123',
            password: 'newPass456'
        });

        expect(updatedUser.password).toBe('newPass456');
    });

    it('should not be able to update the password without old password', async () => {
        const user = await usersRepository.create({
            name: 'User1',
            email: 'user1@example.com',
            password: 'pass123'
        });

        
        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Name',
                email: 'email@example.com',
                password: 'newPass456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to update the password with wrong old password', async () => {
        const user = await usersRepository.create({
            name: 'User1',
            email: 'user1@example.com',
            password: 'pass123'
        });

        
        await expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'Name',
                email: 'email@example.com',
                old_password: 'worngOldPass',
                password: 'newPass456'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to show the profile from non-existing user', async () => {
        expect(
            updateProfileService.execute({
                user_id: 'nonExcistingId',
                name: 'Name',
                email: 'email@example.com',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});