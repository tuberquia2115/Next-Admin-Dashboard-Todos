import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { WidgetItem } from '@/components';
import { authOptions } from '@/auth';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/api/auth/signin');
  }

  return (
    <div className="grid gap-6 grid-cols-1">
      <WidgetItem title="Usuario conectado: Server side">
        <div className="flex flex-col">
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
          <span>{session.user?.image}</span>
          <div>{JSON.stringify(session, null, 10)}</div>
        </div>
      </WidgetItem>
    </div>
  );
}
