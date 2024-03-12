'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function ProfilPage() {
  const { data: session } = useSession();

  useEffect(() => {
    console.log('client side');
  }, []);

  return (
    <div>
      <h1 className="text-3xl text-green-300 pb-3">Profile Page</h1>
      <hr />
      <div className="flex flex-col">
        <span>NAME: {session?.user?.name ?? 'No Name'}</span>
        <span>EMAIL: {session?.user?.email ?? 'No Email'}</span>
        <span>IMAGE: {session?.user?.image ?? 'No Image'}</span>
        <span>ID: {session?.user?.id ?? 'no-uuid'}</span>
        <span className="capitalize text-blue-500">
          ROLES: {session?.user?.roles?.join(', ') ?? ['no-roles']}
        </span>
      </div>
    </div>
  );
}
