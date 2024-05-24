import nodemailer from 'nodemailer';

interface IEmailProps {
  email: string;
  subject: string;
  message: string;
}

export default async (emailProps: IEmailProps) => {
  const { email, subject, message } = emailProps;

  await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });

  try {
    return transporter.sendMail({
      from: '"Halver 👋" <foo@example.com>',
      to: email,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });
  } catch (error) {
    return new Error(error.message);
  }
};
