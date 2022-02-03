import { millisToMinutesAndSeconds } from '@lib/time';
import { currentTrackIdState, isPlayingState } from 'atoms/songAtom';
import useSpotify from 'hooks/useSpotify';
import React from 'react';
import { useSetRecoilState } from 'recoil';

interface ISongProps {
  track: any;
  order: string;
}

const Song = ({ track, order }: ISongProps) => {
  const spotifyApi = useSpotify();
  const setCurrentTrackId = useSetRecoilState(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);

  const playSong = () => {
    spotifyApi
      .play({
        uris: [track.uri],
      })
      .then(() => {
        setCurrentTrackId(track.id);
        setIsPlaying(true);
      })
      .catch((e) => {
        if (e.name === 'WebapiPlayerError') {
          alert('You must have the Spotify app turned on on some device!');
        } else {
          console.log(e);
        }
      });
  };

  return (
    <div
      className="grid cursor-pointer grid-cols-2 rounded-md py-2 px-5 text-gray-500 hover:bg-gray-900"
      onClick={playSong}
    >
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img className="h-10 w-10" src={track.album.images[0].url} alt="Track picture" />
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.name}</p>
          <p className="w-40 truncate">{track.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="mr-10 hidden w-40 truncate md:inline lg:w-80">{track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
