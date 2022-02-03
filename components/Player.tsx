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
import { useRecoilState } from 'recoil';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState<any>(currentTrackIdState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(({ body }) => {
        setCurrentTrackId(body?.item?.id);

        spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
          setIsPlaying(body?.is_playing);
        });
      });
    }
  };

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(({ body }) => {
      if (body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [currentTrackId, spotifyApi, session]);

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-gray-900/0 to-gray-900 px-2 text-xs text-white md:px-8 md:text-sm lg:text-base">
      {/* Left */}
      <div className="mr-6 flex items-center space-x-4 md:mr-10 lg:mr-12">
        <img
          className="hidden h-12 w-12 drop-shadow-lg md:inline lg:h-14 lg:w-14"
          src={songInfo?.album?.images?.[0]?.url}
          alt="Song picture"
        />
        <div className="overflow-hidden">
          <h3 className="truncate">{songInfo?.name}</h3>
          <p className="truncate text-gray-500 md:text-sm">{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-evenly">
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
      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon className="player-button" />
        <input
          className="h-1 w-14 cursor-ew-resize md:w-28"
          type="range"
          value={volume}
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
