import prisma from '../../../../prisma/client';

export async function PUT(request, { params }) {
    const { title, status } = await request.json();

    const task = await prisma.task.update({
        where: { id: Number(params.id) },
        data: { title, status },
    });

    return new Response(JSON.stringify(task), { status: 200 });
}

export async function DELETE(request, { params }) {
    await prisma.task.delete({
        where: { id: Number(params.id) },
    });

    return new Response(null, { status: 204 });
}