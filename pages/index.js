import React from 'react';
import Image from 'next/image';
import Logo from '../assets/images/logo.svg';
import { ReactComponent as Twitter } from '../assets/images/twitter.svg';
import styles from './index.module.css';

const Home = () => (
  <>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image src={Logo} width={46} height={46} />
          <h1>Storm</h1>
        </div>
        <h2>The way we see torrent clients has changed.</h2>
        <span>
          Storm comes with the idea of change the way we see torrent clients, because all of
          them always have those typical tables with a lot of data that most of the regular users
          doesn&apos;t understand it all, including us. We tried to put just the necessary features
          with a beautiful UI/UX.
          <br />
          <br />
          Storm is an open source project, so if you want to build the best torrent client ever,
          this is the best time for you.
        </span>
        <div className={styles.linksContainer}>
          <a href="https://github.com/nuzzesick/storm-desktop/releases" target="_blank" rel="noreferrer">Try beta now</a>
          <a href="https://github.com/nuzzesick/storm-desktop" target="_blank" rel="noreferrer">Contribute</a>
        </div>
      </div>
      <a className={styles.twitterButton} href="https://twitter.com/nuzzze" target="_blank" rel="noreferrer">
        <Twitter />
        Follow me on Twitter
      </a>
    </div>
  </>
);

export default Home;
