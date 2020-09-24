import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe'

import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvier: IMailTemplateProvider
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                },
                tls: { rejectUnauthorized: false }
            });
    
            this.client = transporter;
        });
    }

    public async sendMail({ from, to, subject, templateData }: ISendMailDTO): Promise<void> {
        const message = await this.client.sendMail({
            from: `${from?.name} <${from?.email}>`,
            to: `${to.name} <${to.email}>`,
            subject,
            html: await this.mailTemplateProvier.parse(templateData),
        });

        console.log(message.messageId);
        console.log(nodemailer.getTestMessageUrl(message));
    }
}

export default EtherealMailProvider;