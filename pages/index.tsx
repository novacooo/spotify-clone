import React from 'react';
import Head from 'next/head';
import Sidebar from '../components/Sidebar';

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>spotify-clone</title>
      </Head>

      <h1>This is a spotify-clone build!</h1>

      <main>
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>
    </div>
  );
}
