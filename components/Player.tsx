import {
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  RewindIcon,
  SwitchHorizontalIcon,
  VolumeUpIcon,
} from '@heroicons/react/solid';
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import { currentTrackIdState, isPlayingState } from 'atoms/songAtom';
import useSongInfo from 'hooks/useSongInfo';
import useSpotify from 'hooks/useSpotify';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const currentTrackId = useRecoilValue(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const handleError = (e: any) => {
    if (e.name === 'WebapiPlayerError') {
      alert('You must have the Spotify app turned on on some device!');
    } else {
      console.log(e);
    }
  };

  const handlePlayPause = () => {
    spotifyApi
      .getMyCurrentPlaybackState()
      .then(({ body }) => {
        if (body?.is_playing) {
          spotifyApi
            .pause()
            .then(() => {
              setIsPlaying(false);
            })
            .catch((e) => handleError(e));
        } else {
          spotifyApi
            .play()
            .then(() => {
              setIsPlaying(true);
            })
            .catch((e) => handleError(e));
        }
      })
      .catch((e) => handleError(e));
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      setVolume(80);
    }
  }, [currentTrackId, spotifyApi, session]);

  const transition = songInfo ? 'translate-y-0 opacity-100' : 'translate-y-1/2 opacity-0';

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-gray-900/0 to-gray-900 px-2 text-xs text-white md:px-8 md:text-sm lg:text-base">
      {/* Left */}
      <div
        className={`relative mr-6 flex items-center space-x-4 transition duration-1000 ${transition} md:mr-10 lg:mr-12`}
      >
        <img
          className="hidden h-12 w-12 drop-shadow-lg md:inline lg:h-14 lg:w-14"
          src={songInfo ? songInfo.album?.images?.[0]?.url : 'https://placekitten.com/640/360'}
          alt="Song picture"
        />
        <div className="overflow-hidden">
          <h3 className="truncate">{songInfo ? songInfo.name : 'Song name'}</h3>
          <p className="truncate text-gray-500 md:text-sm">
            {songInfo ? songInfo.artists?.[0]?.name : 'Artist name'}
          </p>
        </div>
      </div>

      {/* Center */}
      <div className={`flex items-center justify-evenly transition duration-1000 ${transition}`}>
        <SwitchHorizontalIcon className="player-button" />
        <RewindIcon className="player-button" />

        {isPlaying ? (
          <PauseIcon className="player-button h-10 w-10" onClick={handlePlayPause} />
        ) : (
          <PlayIcon className="player-button h-10 w-10" onClick={handlePlayPause} />
        )}

        <FastForwardIcon className="player-button" />
        <ReplyIcon className="player-button" />
      </div>

      {/* Right */}
      <div
        className={`flex items-center justify-end space-x-3 pr-5 transition duration-1000 ${transition} md:space-x-4`}
      >
        <VolumeDownIcon className="player-button" />
        <input
          className="h-1 w-14 cursor-ew-resize md:w-28"
          type="range"
          min={0}
          max={100}
          step={1}
        />
        <VolumeUpIcon className="player-button" />
      </div>
    </div>
  );
};

export default Player;
