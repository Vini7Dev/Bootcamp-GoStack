import FakeUsersReposutory from '../repositories/fakes/FakeUsersReposutory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersReposutory: FakeUsersReposutory;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('Create User', () => {
    beforeEach(() => {
        fakeUsersReposutory = new FakeUsersReposutory();
        fakeHashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersReposutory, fakeHashProvider);
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        expect(user).toHaveProperty('id');
    });

    it('it should not be able to create a new user with an email already exists', async () => {
        await createUser.execute({
            name: 'name',
            email: 'email@example.com',
            password: 'pass123'
        });

        await expect(
            createUser.execute({
                name: 'name',
                email: 'email@example.com',
                password: 'pass123'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});