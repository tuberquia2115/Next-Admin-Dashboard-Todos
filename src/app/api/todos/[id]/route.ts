import { NextResponse } from 'next/server';
import { Todo } from '@prisma/client';
import * as yup from 'yup';

import prisma from '@/lib/prisma';
import { gerUserSessionServer } from '@/auth/actions/auth-actions';

interface Segments {
  params: {
    id: string;
  };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  const user = await gerUserSessionServer();

  if (!user) {
    return null;
  }

  const todo = await prisma.todo.findFirst({ where: { id } });

  if (todo?.id !== user.id) {
    return null;
  }

  return todo;
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ message: `No existe el todo con el id ${params.id}` }, { status: 404 });
  }

  return NextResponse.json(todo);
}

const putSchema = yup.object({
  complete: yup.bool().optional(),
  description: yup.string().optional(),
});

export async function PUT(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo) {
    return NextResponse.json({ message: `No existe el todo con el id ${params.id}` }, { status: 404 });
  }

  try {
    const { complete, description } = await putSchema.validate(await request.json());

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { complete, description },
    });

    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
