'use client';

import { useSession, signOut, signIn } from 'next-auth/react';
import { IoLogInOutline, IoLogOut } from 'react-icons/io5';

export const LogoutButton = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
        <IoLogOut />
        <span className="group-hover:text-gray-700">Espere...</span>
      </div>
    );
  }
  if (status === 'unauthenticated') {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        <IoLogInOutline />
        <span className="group-hover:text-gray-700">Login</span>
      </button>
    );
  }

  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      <IoLogOut />
      <span className="group-hover:text-gray-700">Logout</span>
    </button>
  );
};
