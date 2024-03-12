'use server';

import { revalidatePath } from 'next/cache';
import { Todo } from '@prisma/client';

import prisma from '@/lib/prisma';

export const sleep = async (seconds: number = 0) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const todo = await prisma.todo.findFirst({ where: { id } });

  if (!todo) {
    throw `Todo con id ${id} no encontrado`;
  }

  const updatedTodo = await prisma.todo.update({ where: { id }, data: { complete } });

  revalidatePath('/dashboard/server-todos');
  return updatedTodo;
};

interface AddTodo {
  description: string;
  complete: boolean;
  title: string;
  userId: string;
}

export const addTodo = async ({ description, complete, title, userId }: AddTodo) => {
  try {
    const todo = await prisma.todo.create({ data: { description, complete, title, userId } });
    revalidatePath('/dashboard/server-todos');
    return todo;
  } catch (error) {
    return {
      message: 'Error creando todo',
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  await prisma.todo.deleteMany({ where: { complete: true } });
  revalidatePath('/dashboard/server-todos');
};

export const deleteTodoById = async (id: string) => {
  await prisma.todo.delete({ where: { id } });
  revalidatePath('/dashboard/server-todos');
};
