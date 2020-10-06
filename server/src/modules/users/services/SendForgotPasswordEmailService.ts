import { inject, injectable } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/model/IMailProvider';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

interface IServiceProps {
    email: string;
}

@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokenRepository: IUserTokensRepository
    ) {}

    public async execute({ email }: IServiceProps): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if(!user) {
            throw new AppError('User does not exists.');
        }

        const { token } = await this.userTokenRepository.generate(user.id);

        const templateFilePath = path.resolve( __dirname, '..', 'views','forgot_password.hbs')

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            from: {
                name: 'Equipe GoBarber',
                email: 'equipe@gobarber.com.br'
            },
            subject: '[GoBarber] Recuperação de senha...',
            templateData: {
                file: templateFilePath,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/reset-password?token=${token}`
                }
            },
        });
    }
}

export default SendForgotPasswordEmailService;