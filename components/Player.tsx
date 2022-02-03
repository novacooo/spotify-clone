import { SwitchHorizontalIcon } from '@heroicons/react/outline';
import { currentTrackIdState, isPlayingState } from 'atoms/songAtom';
import useSongInfo from 'hooks/useSongInfo';
import useSpotify from 'hooks/useSpotify';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState<any>(currentTrackIdState);
  const [isPLaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(({ body }) => {
        console.log('Now playing:', body?.item);
        setCurrentTrackId(body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
          setIsPlaying(body?.is_playing);
        });
      });
    }
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-sm lg:text-base">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          className="hidden h-12 w-12 md:inline lg:h-14 lg:w-14"
          src={songInfo?.album.images?.[0]?.url}
          alt="Song picture"
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div>
        <SwitchHorizontalIcon className="h-5 w-5" />
      </div>
    </div>
  );
};

export default Player;
