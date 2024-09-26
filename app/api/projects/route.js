import prisma from '../../../prisma/client';

export async function POST(request) {
    const { name, userId } = await request.json();

    const project = await prisma.project.create({
        data: { name, userId },
    });

    return new Response(JSON.stringify(project), { status: 201 });
}

export async function GET() {
    const projects = await prisma.project.findMany();
    return new Response(JSON.stringify(projects), { status: 200 });
}