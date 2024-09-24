import prisma from '../../../prisma/client';

export async function GET(request) {
    const users = await prisma.user.findMany()

    return Response.json({ users });
}