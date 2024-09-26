import prisma from '../../../../prisma/client';

export async function GET() {
    const users = await prisma.user.findMany();
    return new Response(JSON.stringify(users), { status: 200 });
}