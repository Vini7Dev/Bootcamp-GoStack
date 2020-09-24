import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersReposutory';
import ListProvidersService from './ListProvidersService';

let usersRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProvidersService', () => {
    beforeEach(() => {
        usersRepository = new FakeUsersRepository();
        listProvidersService = new ListProvidersService(usersRepository);
    });

    it('should be able to list the profile', async () => {
        const user1 = await usersRepository.create({
            name: 'User1',
            email: 'email1@example.com',
            password: 'pass123'
        });

        const user2 = await usersRepository.create({
            name: 'User2',
            email: 'email2@example.com',
            password: 'pass123'
        });

        const loggedUser = await usersRepository.create({
            name: 'User3',
            email: 'email3@example.com',
            password: 'pass123'
        });

        const providers = await listProvidersService.execute({
            user_id: loggedUser.id,
        });

        expect(providers).toEqual([
            user1,
            user2
        ]);
    });
});