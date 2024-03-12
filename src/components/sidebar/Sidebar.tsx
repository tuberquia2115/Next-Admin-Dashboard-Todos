import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import {
  IoBasketOutline,
  IoCalendarOutline,
  IoCheckboxOutline,
  IoCodeWorkingOutline,
  IoListOutline,
  IoPersonOutline,
} from 'react-icons/io5';

import devTuberLogo from '../../../public/devtuber.webp';
import profileAvatar from '../../../public/avatarProfile.webp';

import { LogoutButton, SidebarItem } from '..';
import { authOptions } from '@/auth';

const menuItems = [
  {
    icon: <IoCalendarOutline size={30} />,
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    icon: <IoCheckboxOutline size={30} />,
    title: 'Rest TODOS',
    path: '/dashboard/rest-todos',
  },
  {
    icon: <IoListOutline size={30} />,
    title: 'Server Actions',
    path: '/dashboard/server-todos',
  },
  {
    icon: <IoCodeWorkingOutline size={30} />,
    title: 'Cookies',
    path: '/dashboard/cookies',
  },
  {
    icon: <IoBasketOutline size={30} />,
    title: 'Productos',
    path: '/dashboard/products',
  },
  {
    icon: <IoPersonOutline size={30} />,
    title: 'Perfil',
    path: '/dashboard/profile',
  },
];

export const Sidebar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <Link href="/dashboard" title="home" className="px-6 py-4 flex justify-center items-center">
          <Image
            priority={true}
            src={devTuberLogo}
            className="w-40"
            width={180}
            height={180}
            alt="tailus logo"
          />
        </Link>

        <div className="mt-8 text-center">
          <Image
            src={session?.user?.image ?? profileAvatar}
            priority={true}
            alt="avatar user"
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            height={150}
            width={150}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name ?? 'No name'}
          </h5>
          <span className="hidden text-gray-400 capitalize lg:block">
            Frontend Developer {session?.user?.roles?.join(',')}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {menuItems.map((item) => (
            <SidebarItem key={item.path} {...item} />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <LogoutButton />
      </div>
    </aside>
  );
};
