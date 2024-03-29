import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { injectable, inject } from 'tsyringe'

import mailConfig from '@config/mail';

import IMailProvider from '../model/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class SESMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvier: IMailTemplateProvider
    ) {
        this.client = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01',
                region: 'us-east-1'
            })
        });
    }

    public async sendMail({ from, to, subject, templateData }: ISendMailDTO): Promise<void> {
        const { name, email } = mailConfig.defaults.from;
        
        await this.client.sendMail({
            from: {
                name: from?.name || name,
                address: from?.email || email
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await this.mailTemplateProvier.parse(templateData),
        });
    }
}

export default SESMailProvider;