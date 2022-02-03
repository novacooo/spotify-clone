import React from 'react';
import Head from 'next/head';
import Sidebar from '@components/Sidebar';
import Center from '@components/Center';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Player from '@components/Player';

const Home = () => (
  <div className="h-full overflow-hidden bg-black">
    <Head>
      <title>Spotify Player by novaco</title>
    </Head>

    <main className="flex h-full">
      <Sidebar />
      <Center />
    </main>

    <div className="sticky bottom-0">
      <Player />
    </div>
  </div>
);

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
};
