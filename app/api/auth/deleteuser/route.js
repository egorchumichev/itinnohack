import prisma from '../../../../prisma/client';;

export async function DELETE(request) {
    const {email} = await request.json();

    const existingUser = await prisma.user.findUnique({
        where: { email },
      });

    if (!existingUser) {
          return new Response(JSON.stringify({error: 'Нет такого пользователя'}), { status: 401 });
    }

    await prisma.user.delete({
            where: { email },
    });


    return new Response(JSON.stringify({massage:'Все ок, удалил'}), {status: 200});
  }