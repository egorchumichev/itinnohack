import prisma from '../../../prisma/client';

const enumirate = [
    "PENDING",
    "IN_PROGRESS",
    "COMPLETED"
]

export async function POST(request) {
    const { title, status, projectId, userId } = await request.json();

    const existingProject = await prisma.project.findUnique({
        where: { id: projectId},
    });

    const existingUser = await prisma.user.findUnique({
        where: {id :userId },
    });

    if (status) if (!enumirate.includes(status)) {
        return new Response(JSON.stringify({ massage: 'Неподдерживаемый статус'}), { status: 400 });
    }

    if (!existingProject) {
        return new Response(JSON.stringify({ error: `Проекта с id ${projectId} нет` }), { status: 400 });
    }

    if (!existingUser) {
        return new Response(JSON.stringify({ error: `Пользователя c id ${userId} нет` }), { status: 400 });
    }

    

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
    
    if (status) if (!enumirate.includes(status)) {
        return new Response(JSON.stringify({ massage: 'Неподдерживаемый статус'}), { status: 400 });
    }
    
    if (status) where.status = status;
    if (projectId) where.projectId = Number(projectId);

    const tasks = await prisma.task.findMany({ where });

    if (!tasks.length) {
        return new Response(JSON.stringify({ massage: 'С заданными фильтрами задач нет'}), { status: 200 });
    }

    return new Response(JSON.stringify(tasks), { status: 200 });
}