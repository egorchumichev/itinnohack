import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, 
    },
});

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject, 
      text,
    });
    console.log('Вроде работает');
  } catch (error) {
    console.error('Ошибка отправки:', error);
    throw new Error('Ошибка при отправке электронной почты');
  }
};