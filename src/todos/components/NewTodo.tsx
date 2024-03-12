'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoTrashOutline } from 'react-icons/io5';

import { deleteCompleted } from '../actions/todo-actions';
import { Modal } from '@/components';
import * as todosApi from '../helpers/todos';

// import * as todosApi from '@/todos/helpers/todos';

const initialStateForm = {
  description: '',
  complete: false,
  title: '',
};

export const NewTodo = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState(initialStateForm);

  const handleChangeTodo = (key: keyof typeof todo, value: string | boolean) => {
    setTodo((todo) => ({ ...todo, [key]: value }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { description, title, complete } = todo;

    if (description.trim().length === 0 || title.trim().length === 0) return;

    // Crear el todo mediante un server actions
    //await addTodo({ description, complete, title });

    // Crear el todo mediante un llamado un enpoint RestFull-api
    await todosApi.createTodo({ description, complete, title });
    router.refresh();
    setTodo(initialStateForm);
  };

  return (
    <>
      <div className="items-end flex">
        <button
          onClick={() => setShowModal(true)}
          type="button"
          className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
        >
          New Todo
        </button>
        <span className="flex flex-1" />
        <button
          onClick={() => deleteCompleted()}
          type="button"
          className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
        >
          <IoTrashOutline />
          <span className="ml-2">Delete all complete</span>
        </button>
      </div>

      <Modal title="New Todo" showModal={showModal} onCloseModal={() => setShowModal(false)}>
        <form onSubmit={onSubmit} className="flex">
          <div className="flex-1">
            <div className="flex flex-col pb-3 w-full">
              <label htmlFor="title">Titulo</label>
              <input
                className="pl-3 pr-3 py-2 rounded-lg border-2 border-blue-200 outline-none focus:border-sky-500 transition-all"
                name="title"
                onChange={({ target }) => handleChangeTodo('title', target.value)}
                type="text"
                id="title"
                value={todo.title}
              />
            </div>
            <div className="flex flex-col pb-3 w-full">
              <label htmlFor="description">Descripción</label>
              <textarea
                name="description"
                id="description"
                cols={30}
                rows={5}
                onChange={({ target }) => handleChangeTodo('description', target.value)}
                className="pl-3 pr-3 py-2 rounded-lg border-2 border-blue-200 outline-none focus:border-sky-500 transition-all resize-none"
                value={todo.description}
              />
            </div>

            <div className="flex-row justify-center items-center pb-3">
              <input
                type="checkbox"
                id="complete"
                name="complete"
                checked={todo.complete}
                onChange={({ target }) => handleChangeTodo('complete', target.checked)}
              />
              <label htmlFor="complete" className="pl-3">
                Complete
              </label>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
            >
              Crear
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
