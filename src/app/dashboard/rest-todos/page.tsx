export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { redirect } from 'next/navigation';

import { gerUserSessionServer } from '@/auth/actions/auth-actions';
import Prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';

// export const metadata = {
//   title: 'Lista de Todos',
//   description: 'SEO Title',
// };

export default async function RestTodosPage() {
  // TODO: Puedo hacer el fetch a la restFull API al lado del cliente.
  // Pero se pierde poner la metadata de la page.
  // useEffect(() => {
  //   fetch('/api/todos')
  //     .then((resp) => resp.json())
  //     .then(console.log);
  // }, []);

  const user = await gerUserSessionServer();

  if (!user) redirect('/api/auth/signin');

  const todos = await Prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: 'asc' },
  });

  return (
    <div>
      <h2 className="text-blue-400 text-2xl py-3"> Con Restful API</h2>

      <div className="w-full mb-5">
        <NewTodo />
      </div>

      <TodosGrid todos={todos} />
    </div>
  );
}
