// eslint-disable-next-line spaced-comment
// <reference types="spotify-api" />

import React, { useEffect, useState } from 'react';
import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  LogoutIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState } from 'recoil';
import useSpotify from 'hooks/useSpotify';
import { playlistIdState } from 'atoms/playlistAtom';

const Sidebar = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPLaylists] = useState<any>([]);
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        setPLaylists(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  return (
    <div className="hidden h-screen overflow-y-scroll border-r border-gray-900 p-5 text-xs text-gray-500 scrollbar-hide sm:max-w-[12rem] md:inline-flex lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <button
          className="flex max-w-full items-center space-x-2 hover:text-white"
          onClick={() => signOut()}
        >
          <LogoutIcon className="h-5 w-5 min-w-fit" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Sign out</p>
        </button>
        <button className="flex max-w-full items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5 min-w-fit" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Home</p>
        </button>
        <button className="flex max-w-full items-center space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5 min-w-fit" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Search</p>
        </button>
        <button className="flex max-w-full items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5 min-w-fit" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Your Library</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        <button className="flex max-w-full items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5 min-w-fit" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Create Playlist</p>
        </button>
        <button className="flex max-w-full items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 min-w-fit" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Liked Songs</p>
        </button>
        <button className="flex max-w-full items-center space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 min-w-fit" />
          <p className="overflow-hidden text-ellipsis whitespace-nowrap">Your Episodes</p>
        </button>

        <hr className="border-t-[0.1px] border-gray-900" />

        {/* TODO: Add active state for selected playlist */}

        {playlists.map((playlist: any) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistId(playlist.id)}
            className="cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
