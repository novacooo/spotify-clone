import React, { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { shuffle } from 'lodash';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState, playlistState } from 'atoms/playlistAtom';
import useSpotify from 'hooks/useSpotify';
import Songs from '@components/Songs';

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
  const spotifyApi = useSpotify();
  const [color, setColor] = useState<string>();
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState<any>(playlistState);

  useEffect(() => {
    const shuffledColors = shuffle(colors);
    const newColor = shuffledColors.pop();

    setColor((prevColor) => {
      if (prevColor === newColor) {
        return shuffledColors.pop();
      }
      return newColor;
    });
  }, [playlistId]);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then((data) => {
        setPlaylist(data.body);
      })
      .catch((err) => console.log('Something went wrong!', err));
  }, [spotifyApi, playlistId]);

  return (
    <div className="h-screen flex-grow overflow-y-scroll scrollbar-hide">
      <header className="absolute top-5 right-8">
        {session && (
          <div
            className="flex items-center space-x-3 rounded-full bg-black bg-opacity-70 p-1 pr-4 text-white hover:cursor-pointer hover:bg-opacity-80"
            onClick={() => signOut()}
          >
            <img className="h-9 w-9 rounded-full" src={session.user.image} alt="Profile picture" />
            <p className="text-sm">{session.user.name}</p>
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        )}
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b p-8 ${color} to-black text-white`}
      >
        <img
          className="h-44 w-44 shadow-2xl"
          src={playlist?.images[0].url}
          alt="Playlist picture"
        />
        <div>
          <p className="mb-2 text-xs md:text-sm xl:text-base">PLAYLIST</p>
          <h1 className="text-2xl font-bold md:text-3xl xl:text-5xl">{playlist?.name}</h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
};

export default Center;
