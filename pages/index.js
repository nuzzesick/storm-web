/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import { Header } from '../components';
import styles from './index.module.css';

const Home = () => {
  useEffect(() => {
    if (process.browser) {
      const canvas = document.getElementById('nokey');
      let canW = parseInt(canvas.getAttribute('width'), 10);
      let canH = parseInt(canvas.getAttribute('height'), 10);
      const ctx = canvas.getContext('2d');

      const ballColor = {
        r: 91,
        g: 80,
        b: 222,
        a: 70,
      };
      const R = 2;
      let balls = [];
      const alphaF = 0.03;

      // Line
      const linkLineWidth = 0.8;
      const disLimit = 260;
      const mouseBall = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        type: 'mouse',
      };

      const randomNumFrom = (min, max) => Math.random() * (max - min) + min;

      // Random speed
      const getRandomSpeed = (pos) => {
        const min = -1;
        const max = 1;
        switch (pos) {
          case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.1, max)];
          case 'right':
            return [randomNumFrom(min, -0.1), randomNumFrom(min, max)];
          case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.1)];
          case 'left':
            return [randomNumFrom(0.1, max), randomNumFrom(min, max)];
          default:
        }
        return true;
      };

      const randomArrayItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
      const randomSidePos = (length) => Math.ceil(Math.random() * length);

      // Random Ball
      const getRandomBall = () => {
        const pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
        switch (pos) {
          case 'top':
            return {
              x: randomSidePos(canW),
              y: -R,
              vx: getRandomSpeed('top')[0],
              vy: getRandomSpeed('top')[1],
              r: R,
              alpha: 1,
              phase: randomNumFrom(0, 10),
            };
          case 'right':
            return {
              x: canW + R,
              y: randomSidePos(canH),
              vx: getRandomSpeed('right')[0],
              vy: getRandomSpeed('right')[1],
              r: R,
              alpha: 1,
              phase: randomNumFrom(0, 10),
            };
          case 'bottom':
            return {
              x: randomSidePos(canW),
              y: canH + R,
              vx: getRandomSpeed('bottom')[0],
              vy: getRandomSpeed('bottom')[1],
              r: R,
              alpha: 1,
              phase: randomNumFrom(0, 10),
            };
          case 'left':
            return {
              x: -R,
              y: randomSidePos(canH),
              vx: getRandomSpeed('left')[0],
              vy: getRandomSpeed('left')[1],
              r: R,
              alpha: 1,
              phase: randomNumFrom(0, 10),
            };
          default:
        }
        return true;
      };

      // Draw Ball
      const renderBalls = () => {
        Array.prototype.forEach.call(balls, (b) => {
          if (!b.hasOwnProperty('type')) {
            ctx.fillStyle = `rgba(${ballColor.r},${ballColor.g},${ballColor.b},${b.alpha})`;
            ctx.beginPath();
            ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
          }
        });
      };

      // Update balls
      const updateBalls = () => {
        const newBalls = [];
        Array.prototype.forEach.call(balls, (ball) => {
          const b = ball;
          b.x += b.vx;
          b.y += b.vy;
          if (b.x > -(50) && b.x < (canW + 50) && b.y > -(50) && b.y < (canH + 50)) {
            newBalls.push(b);
          }
          // alpha change
          b.phase += alphaF;
          b.alpha = Math.abs(Math.cos(b.phase));
        });

        balls = newBalls.slice(0);
      };

      // calculate distance between two points
      const getDisOf = (b1, b2) => {
        const deltaX = Math.abs(b1.x - b2.x);
        const deltaY = Math.abs(b1.y - b2.y);

        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      };

      // Draw lines
      const renderLines = () => {
        let fraction; let
          alpha;
        for (let i = 0; i < balls.length; i += 1) {
          for (let j = i + 1; j < balls.length; j += 1) {
            fraction = getDisOf(balls[i], balls[j]) / disLimit;

            if (fraction < 1) {
              alpha = (1 - fraction).toString();

              ctx.strokeStyle = `rgba(150,150,150,${alpha})`;
              ctx.lineWidth = linkLineWidth;

              ctx.beginPath();
              ctx.moveTo(balls[i].x, balls[i].y);
              ctx.lineTo(balls[j].x, balls[j].y);
              ctx.stroke();
              ctx.closePath();
            }
          }
        }
      };

      // add balls if there a little balls
      const addBallIfy = () => {
        if (balls.length < 20) {
          balls.push(getRandomBall());
        }
      };

      // Render
      const render = () => {
        ctx.clearRect(0, 0, canW, canH);
        renderBalls();
        renderLines();
        updateBalls();
        addBallIfy();
        window.requestAnimationFrame(render);
      };

      // Init Balls
      const initBalls = (num) => {
        for (let i = 1; i <= num; i += 1) {
          balls.push({
            x: randomSidePos(canW),
            y: randomSidePos(canH),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10),
          });
        }
      };
      // Init Canvas
      const initCanvas = () => {
        canvas.setAttribute('width', window.innerWidth);
        canvas.setAttribute('height', window.innerHeight);

        canW = parseInt(canvas.getAttribute('width'), 10);
        canH = parseInt(canvas.getAttribute('height'), 10);
      };
      window.addEventListener('resize', () => {
        initCanvas();
      });

      const goMovie = () => {
        initCanvas();
        initBalls(30);
        window.requestAnimationFrame(render);
      };
      goMovie();

      // Mouse effect
      canvas.addEventListener('mouseenter', () => {
        balls.push(mouseBall);
      });
      canvas.addEventListener('mouseleave', () => {
        const newBalls = [];
        Array.prototype.forEach.call(balls, (b) => {
          if (!b.hasOwnProperty('type')) {
            newBalls.push(b);
          }
        });
        balls = newBalls.slice(0);
      });
      canvas.addEventListener('mousemove', (e) => {
        const event = e || window.event;
        mouseBall.x = event.pageX;
        mouseBall.y = event.pageY;
      });
    }
  }, []);
  const [video, setVideo] = useState(null);
  const [torrentName, setTorrentName] = useState(null);
  const [isVideo, setIsVideo] = useState(false);
  const [hash, setHash] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const sendForm = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const requestOptions = {
      method: 'GET',
    };
    const res = await fetch(`https://testing-node-torrnt.herokuapp.com/download?hash=${hash}`, requestOptions);
    const data = await res.json();
    const { name, path } = await data;
    setTorrentName(name);
    setTimeout(() => {
      setVideo(`https://testing-node-torrnt.herokuapp.com/torrents/${path}`);
      setIsVideo(true);
      setIsLoading(false);
    }, 15000);
  };
  return (
    <>
      <Header />
      <canvas id="nokey" className={styles.canvas}>
        Your browser do not support canvas, please download Chrome
      </canvas>
      <div className={styles.appContainer}>
        <div className={styles.blurContainer}>
          {
            isVideo ? (
              // eslint-disable-next-line jsx-a11y/media-has-caption
              <>
                <h1>
                  Watching: &nbsp;
                  {torrentName}
                </h1>
                <video src={video} controls autoPlay />
              </>
            ) : (
              <>
                <h1>Enter a movie torrent hash</h1>
                <form onSubmit={(e) => { sendForm(e); }}>
                  <input
                    type="text"
                    placeholder="e.g: 966D30A8BBC61A1FB50842CAB6983B17ECA2CF9A"
                    value={hash}
                    onChange={(e) => { setHash(e.target.value); }}
                    disabled={isLoading}
                  />
                  <input type="submit" value={isLoading ? 'Loading...' : 'Download'} disabled={isLoading} />
                </form>
              </>
            )
          }
        </div>
      </div>
    </>
  );
};

export default Home;
