import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-yellow-500',
  'from-pink-500',
  'from-purple-500',
];

const Center = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState<string>();

  useEffect(() => {
    const color = shuffle(colors).pop() as string;
    setColor(color);
  }, []);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex items-center space-x-3 rounded-full bg-black bg-opacity-70 p-1 pr-4 text-white hover:cursor-pointer hover:bg-opacity-80">
          <img className="h-10 w-10 rounded-full" src={session?.user.image} alt="Profile picture" />
          <p>{session?.user.name}</p>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>
      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black text-white`}
      >
        {/* <img src="" alt="" /> */}
      </section>
    </div>
  );
};

export default Center;
