import prisma from '../../../../prisma/client';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../../../lib/mailer';

export async function POST(request) {
    const { email, password } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'Опа, а пользователь то уже есть!' }), { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { email, password: hashedPassword },
    });

    await sendEmail(email, 'Добро пожаловать!', 'Вы успешно зарегистрировались в менеджере проектов Rush. Даша и егор дураки!');

    return new Response(JSON.stringify({ id: user.id, email: user.email }), { status: 201 });
}