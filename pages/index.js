import React from 'react';
import Logo from '../assets/images/logo.svg';
import { ReactComponent as Twitter } from '../assets/images/twitter.svg';
import styles from './index.module.css';

const Home = () => (
  <>
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <img src={Logo} width={46} height={46} alt="logo" />
          <h1>Storm</h1>
        </div>
        <h2>The way we see torrent clients has changed.</h2>
        <span>
          Storm comes with the idea of change the way we see torrent clients.
          Traditional clients always have those tables with data you don&apos;t need to see.
          Storm gives you just the necessary features with a beautiful UI/UX.
          <br />
          <br />
          Storm is an open source project, so if you want to build the best torrent client ever,
          this is the best time for you.
        </span>
        <div className={styles.linksContainer}>
          <a href="https://github.com/nuzzesick/storm-desktop/releases" target="_blank" rel="noreferrer">Try beta now</a>
          <a href="https://github.com/nuzzesick/storm-desktop" target="_blank" rel="noreferrer">Contribute</a>
        </div>
        <div className={styles.screenshotsContainer}>
          <h2>Screenshots</h2>
          <h3>Home </h3>
          <img className={styles.screenshot} src="https://user-images.githubusercontent.com/27747658/128960457-05091489-730f-42a6-805e-4beb381ea8fa.png" alt="home" />
          <h3>Settings</h3>
          <img className={styles.screenshot} src="https://user-images.githubusercontent.com/27747658/128960480-7d548142-1cf7-4fcd-9b87-5f1b9deb9eeb.png" alt="home" />
        </div>
      </div>
      <div className={styles.twitterButtonContainer}>
        <a className={styles.twitterButton} href="https://twitter.com/nuzzze" target="_blank" rel="noreferrer">
          <Twitter />
          Follow me on Twitter
        </a>
      </div>
    </div>
  </>
);

export default Home;
