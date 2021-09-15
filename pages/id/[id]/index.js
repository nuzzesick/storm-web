import React from 'react';
import WebTorrent from 'webtorrent';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Logo from '../../../assets/images/logo.svg';
import styles from './play.module.css';

const client = new WebTorrent();

const PlayPage = () => {
  const { asPath } = useRouter();
  const torrentId = asPath.substring(4);
  const [torrent, setTorrent] = React.useState(null);

  React.useEffect(() => {
    if (process.browser && torrentId !== '[id]' && !torrent) {
      // Download the torrent
      client.add(torrentId, (t) => {
        const file = t.files.find((f) => f.name.endsWith('.mp4'));
        setTorrent(t);
        file.appendTo('#output');
      });
    }
  }, [torrentId, torrent]);

  return (
    <>
      <Head>
        <title>
          {torrent && `Playing ${torrent.name} |`}
          Storm
        </title>
      </Head>
      <div className={styles.container}>
        <h1>{torrent ? `Playing ${torrent.name}` : 'Loading...'}</h1>
        <div id="output" />
        <div className={styles.poweredBy}>
          Powered by
          <div className={styles.logoContainer}>
            <img src={Logo} width={16} height={16} alt="logo" />
            <span>Storm</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayPage;
