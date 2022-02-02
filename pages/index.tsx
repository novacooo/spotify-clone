import React from 'react';
import Head from 'next/head';
import Sidebar from '@components/Sidebar';
import Center from '@components/Center';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Player from '@components/Player';

const Home = () => (
  <div className="h-screen overflow-hidden bg-black">
    <Head>
      <title>spotify-clone</title>
    </Head>

    <main className="flex">
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
