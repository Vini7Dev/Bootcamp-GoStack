import FakeUsersRepository from '../repositories/fakes/FakeUsersReposutory';
import ShowProfileService from './ShowProfileService';

import AppError from '@shared/errors/AppError';

let usersRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('UpdateProfileUser', () => {
    beforeEach(() => {
        usersRepository = new FakeUsersRepository();
        showProfileService = new ShowProfileService(usersRepository);
    });

    it('should be able to show the profile', async () => {
        const user = await usersRepository.create({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        const findUser = await showProfileService.execute({
            user_id: user.id,
        });

        expect(findUser.name).toBe('Name');
        expect(findUser.email).toBe('email@example.com');
    });

    it('should not be able to show the profile from non-existing user', async () => {
        expect(
            showProfileService.execute({
                user_id: 'nonExcistingId',
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});