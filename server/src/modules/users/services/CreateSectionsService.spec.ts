import FakeUsersReposutory from '../repositories/fakes/FakeUsersReposutory';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

import CreateSectionsService from './CreateSectionsService';
import CreateUserService from './CreateUserService';

import AppError from '@shared/errors/AppError';

let fakeUsersReposutory: FakeUsersReposutory;
let fakeHashProvider: FakeHashProvider;
let createAuth: CreateSectionsService;
let createUser: CreateUserService;

describe('Create Sections', () => {

    beforeEach(() => {
        fakeUsersReposutory = new FakeUsersReposutory();
        fakeHashProvider = new FakeHashProvider();
        createAuth = new CreateSectionsService(fakeUsersReposutory, fakeHashProvider);
        createUser = new CreateUserService(fakeUsersReposutory, fakeHashProvider);
    });

    it('should be able to authenticate', async () => {
        const userCreated = await createUser.execute({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        const response = await createAuth.execute({
            email: 'email@example.com',
            password: 'pass123'
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(userCreated);
    });

    it('should not be able to authenticate with non existing user', async () => {
        expect(createAuth.execute({
            email: 'email@example.com',
            password: 'pass123'
        })).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect password', async () => {
        await createUser.execute({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        await expect(
            createAuth.execute({
                email: 'email@example.com',
                password: 'incorrectpass'
            }
        )).rejects.toBeInstanceOf(AppError);
    });

});