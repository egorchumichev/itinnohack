import prisma from '../../../../prisma/client';

export async function PUT(request, { params }) {
    const { name } = await request.json();
    
    const project = await prisma.project.update({
      where: { id: Number(params.id) },
      data: { name },
    });
  
    return new Response(JSON.stringify(project), { status: 200 });
  }
  
  export async function DELETE(request, { params }) {
    await prisma.project.delete({
      where: { id: Number(params.id) },
    });
  
    return new Response(null, { status: 204 });
  }