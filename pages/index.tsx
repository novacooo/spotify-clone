import React from 'react';
import Head from 'next/head';
import Sidebar from 'components/Sidebar';

const Home = () => (
  <div>
    <Head>
      <title>spotify-clone</title>
    </Head>

    <main>
      <Sidebar />
      {/* Center */}
    </main>

    <div>{/* Player */}</div>
  </div>
);

export default Home;
