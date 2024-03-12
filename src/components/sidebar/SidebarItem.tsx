'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  icon: React.ReactNode;
  path: string;
  title: string;
}

export const SidebarItem = ({ title, path, icon }: Props) => {
  const pathName = usePathname();
  const classNameActive = 'text-white bg-gradient-to-r from-sky-600 to-cyan-400';

  return (
    <li>
      <Link
        href={path}
        className={`px-4 py-3 flex items-center space-x-4 rounded-md group hover:bg-gradient-to-r hover:bg-sky-600 hover:text-white
        ${pathName === path ? classNameActive : ''}`}
      >
        {icon}
        <span className="group-hover:text-white-700">{title}</span>
      </Link>
    </li>
  );
};
