'use client';

import { useOptimistic, startTransition } from 'react';
import { IoCheckboxOutline, IoSquareOutline, IoTrashBinOutline } from 'react-icons/io5';
import { Todo } from '@prisma/client';

import style from './TodoItem.module.css';

interface Props {
  todo: Todo;
  toggleTodo(id: string, complete: boolean): Promise<Todo | void>;
  deleteTodo(id: string): Promise<void>;
  // TODO: Acciones que quiero llamars
}

export const TodoItem = ({ todo, toggleTodo, deleteTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(todo, (state, newCompleteValue: boolean) => ({
    ...state,
    complete: newCompleteValue,
  }));

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(todoOptimistic.id, !todoOptimistic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  };

  return (
    <div className={todoOptimistic.complete ? style.todoDone : style.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimistic.complete ? 'g-blue-100' : 'bg-red-100'
          }`}
        >
          {todoOptimistic.complete ? <IoCheckboxOutline size={30} /> : <IoSquareOutline size={30} />}
        </div>
        <div>
          <span className="text-lg text-blue-400">{todo.title}</span>
          <p className="text-center sm:text-left">{todoOptimistic.description}</p>
          <p>
            <strong className="text-gray-400 text-base">Ultima actualización: </strong>
            {todo.updatedAt.toLocaleTimeString()}
          </p>
        </div>
      </div>
      <button onClick={() => deleteTodo(todoOptimistic.id)}>
        <IoTrashBinOutline size={30} color="red" />
      </button>
    </div>
  );
};
