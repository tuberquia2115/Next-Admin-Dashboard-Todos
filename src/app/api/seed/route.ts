import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';

export async function GET(request: Request) {
  await prisma.todo.deleteMany(); // delete * from todo
  await prisma.user.deleteMany(); // delete * from user

  const user = await prisma.user.create({
    data: {
      email: 'test1@gmail.com',
      password: bcrypt.hashSync('123456'),
      roles: ['admin', 'client', 'super-user'],
      todos: {
        create: [
          { description: 'Piedra del alma', complete: true, title: 'Gema' },
          { description: 'Piedra del poder', title: 'Gema' },
          { description: 'Piedra del tiempo', title: 'Gema' },
          { description: 'Piedra del espacio', title: 'Gema' },
          { description: 'Piedra del realidad', title: 'Gema' },
        ],
      },
    },
  });

  return NextResponse.json({
    message: 'Seed Excuted',
  });
}
