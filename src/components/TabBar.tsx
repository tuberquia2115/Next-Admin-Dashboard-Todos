'use client';

import { useState } from 'react';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

// https://tailwindcomponents.com/component/radio-buttons-1

interface Props {
  currentTab: number;
  tabOptions?: number[];
}

export const TabBar = ({ tabOptions = [1, 2, 3, 4, 5, 6], currentTab = 1 }: Props) => {
  const router = useRouter();
  const [selected, setSelected] = useState(currentTab);

  const onTabSelected = (tab: number) => {
    setSelected(tab);
    setCookie('selectedTab', tab.toString());
    router.refresh();
  };

  return (
    <div className={`grid space-x-2 rounded-xl bg-gray-200 p-2 w-6/12 grid-cols-6`}>
      {tabOptions.map((tab) => (
        <div key={tab.toString()}>
          <input
            type="radio"
            onChange={() => {}}
            id={tab.toString()}
            checked={selected === tab}
            className="peer hidden"
          />
          <label
            onClick={() => onTabSelected(tab)}
            className="transition-all block cursor-pointer select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
          >
            {tab}
          </label>
        </div>
      ))}
    </div>
  );
};
