'use client';

import { Todo } from '@prisma/client';

import { TodoItem } from './TodoItem';
import { toggleTodo, deleteTodoById } from '../actions/todo-actions';
// import * as todosApi from '../helpers/todos';
// import { useRouter } from 'next/navigation';

interface Props {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: Props) => {
  // const router = useRouter();

  const completeTodos = todos.filter((todo) => todo.complete);
  const incompleteTodos = todos.filter((todo) => !todo.complete);

  // const toggleTodo = async (id: string, complete: boolean) => {
  //   const updatedTodo = await todosApi.updateTodo(id, complete);
  //   console.log({ updatedTodo });
  //   router.refresh();
  // };

  return (
    <div className="grid grid-cols-2 gap-2">
      <div>
        <span className="text-2xl">Completed Tasks</span>
        {completeTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodoById} />
        ))}
      </div>
      <div>
        <span className="text-2xl">Incomplete Tasks</span>
        {incompleteTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodoById} />
        ))}
      </div>
    </div>
  );
};
