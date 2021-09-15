/* eslint-disable react/jsx-props-no-spreading */
import '../styles/globals.css';
import Head from 'next/head';
import Logo from '../assets/images/logo.svg';

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta charset="utf-8" />
      <title>Storm</title>
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content="Storm is a modern torrent client built with Electron and React. Storm comes with the idea of change the way we see torrent clients, because all of them always have those typical tables with a lot of data that most of the regular users doesn't understand it all, including us. We tried to put just the necessary features with a beautiful UI/UX." />
      <meta property="og:title" content="Storm" />
      <meta property="og:site_name" content="Storm" />
      <meta name="keywords" content="torrents, webtorrent, p2p, webrtc" />
      <meta name="author" content="Nuzze" />
      <meta property="og:url" content="https://storm-web.vercel.app/" />
      <meta property="og:description" content="Storm is a modern torrent client built with Electron and React. Storm comes with the idea of change the way we see torrent clients, because all of them always have those typical tables with a lot of data that most of the regular users doesn't understand it all, including us. We tried to put just the necessary features with a beautiful UI/UX." />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" value="@nuzzze" />
      <link rel="icon" type="image/svg" href={Logo} />
    </Head>
    <Component {...pageProps} />
    ;
  </>
);
export default App;
