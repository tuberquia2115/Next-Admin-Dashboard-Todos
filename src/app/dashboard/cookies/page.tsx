import { cookies } from 'next/headers';

import { TabBar } from '@/components';

export const metadata = {
  title: 'Cookies',
  description: 'Velit in pariatur cupidatat culpa tempor elit duis quis ad cillum aliqua ad nisi.',
};

export default function CookiesPage() {
  const cookiesStore = cookies();
  const currentTab = cookiesStore.get('selectedTab')?.value ?? '1';
  const allCookies = cookiesStore.getAll();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 gap-2">
      <span>Cookies Store</span>
      {JSON.stringify(allCookies, null, 10)}
      <div className="flex-col">
        <span className="text-3xl">Tabs</span>
        <TabBar currentTab={+currentTab} />
      </div>
    </div>
  );
}
