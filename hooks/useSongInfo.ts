import { currentTrackIdState, isPlayingState } from 'atoms/songAtom';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import useSpotify from './useSpotify';

const useSongInfo = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState<any>(currentTrackIdState);
  const setIsPlaying = useSetRecoilState(isPlayingState);
  const [songInfo, setSongInfo] = useState<any>(null);

  const fetchSongInfo = async () => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyCurrentPlayingTrack()
        .then(async ({ body }) => {
          if (body) {
            const trackId = body.item?.id as string;
            const trackInfo = await spotifyApi.getTrack(trackId);

            setCurrentTrackId(trackId);
            setIsPlaying(body.is_playing);
            setSongInfo(trackInfo.body);
          } else {
            setSongInfo(null);
          }
        })
        .catch((e) => console.log(e));
    }
  };

  useEffect(() => {
    fetchSongInfo();
  }, [currentTrackId, spotifyApi, session]);

  // Check for song info every second
  useEffect(() => {
    const fetchInterval = setInterval(fetchSongInfo, 1000);
    return () => clearInterval(fetchInterval);
  });

  return songInfo;
};

export default useSongInfo;
