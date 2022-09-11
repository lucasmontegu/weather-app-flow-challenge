import React from 'react';
import Head from 'next/head';

interface ILayout {
  children: React.ReactElement;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Check the weather in your location" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
