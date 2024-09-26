import prisma from '../../../prisma/client';

export async function POST(request) {
    const { title, status, projectId, userId } = await request.json();

    const task = await prisma.task.create({
        data: { title, status, projectId, userId },
    });

    return new Response(JSON.stringify(task), { status: 201 });
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const projectId = searchParams.get('projectId');
    
    const where = {};
    if (status) where.status = status;
    if (projectId) where.projectId = Number(projectId);

    const tasks = await prisma.task.findMany({ where });
    return new Response(JSON.stringify(tasks), { status: 200 });
}