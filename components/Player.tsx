import { currentTrackIdState, isPlayingState } from 'atoms/songAtom';
import useSpotify from 'hooks/useSpotify';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';

const Player = () => {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
  const [isPLaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);

  return (
    <div>
      <div>
        <img src="" alt="Song picture" />
      </div>
    </div>
  );
};

export default Player;
