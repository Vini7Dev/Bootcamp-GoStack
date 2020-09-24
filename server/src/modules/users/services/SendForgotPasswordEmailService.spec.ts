import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersReposutory';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeMailProvider: FakeMailProvider;
let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeMailProvider = new FakeMailProvider();
        fakeUsersRepository = new FakeUsersRepository();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeUsersRepository,
            fakeMailProvider,
            fakeUserTokensRepository
        );
    });

    it('should be able to recover the passeord using the email', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRepository.create({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        await sendForgotPasswordEmail.execute({
            email: 'email@example.com'
        });

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover anon-passeord user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'email@example.com'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should generate a forgot password token', async () => {
        const generatedToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRepository.create({
            name: 'Name',
            email: 'email@example.com',
            password: 'pass123'
        });

        await sendForgotPasswordEmail.execute({
            email: 'email@example.com'
        });

        expect(generatedToken).toHaveBeenCalledWith(user.id);
    });
});