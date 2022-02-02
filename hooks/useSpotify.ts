import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
  clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
});

const useSpotify = (): SpotifyWebApi => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh token attempt fails, direct user to login page
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session.user.accessToken as string);
    }
  }, [session]);

  return spotifyApi;
};

export default useSpotify;
