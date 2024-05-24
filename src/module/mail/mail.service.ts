import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import getTemplate from './templates/htmlTemplate';
@Injectable()
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserSignupConfirmation(user: { email: string; password: string }) {
    return this.mailerService.sendMail({
      from: 'isuru.sampath.testmail@gmail.com',
      to: user.email,
      subject: 'Welcome to Halver!',
      html: getTemplate({
        email: user.email,
        password: user.password,
      }),
    });
  }
}
