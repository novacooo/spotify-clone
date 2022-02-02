import { playlistState } from 'atoms/playlistAtom';
import React from 'react';
import { useRecoilValue } from 'recoil';
import Song from '@components/Song';

const Songs = () => {
  const playlist = useRecoilValue<any>(playlistState);

  return (
    <div className="flex flex-col space-y-1 px-8 pb-28 text-white">
      {playlist?.tracks.items.map(({ track }: any, i: string) => (
        <Song key={track.id} track={track} order={i} />
      ))}
    </div>
  );
};

export default Songs;
