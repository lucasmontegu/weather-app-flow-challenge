import React from 'react';
import Head from 'next/head';
import styles from './Layout.module.css';

interface ILayout {
  children: React.ReactElement[] | React.ReactElement;
}

const Layout: React.FC<ILayout> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Weather App</title>
        <meta name="description" content="Check the weather in your location" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
