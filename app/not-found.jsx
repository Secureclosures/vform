'use client';

import { useEffect, useState } from 'react';
import Head from 'next/head';

export default function NotFound() {
  const [dayMode, setDayMode] = useState(true);
  const [quote, setQuote] = useState(quotes[0]);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const intervalId = setInterval(() => {
      setDayMode(prev => !prev);
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, 10000);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getScaleFactor = () => {
    if (windowWidth < 480) return 0.4;
    if (windowWidth < 768) return 0.6;
    if (windowWidth < 1024) return 0.8;
    return 1;
  };

  const scaleFactor = getScaleFactor();

  const styles = {
    dayNightContainer: {
      backgroundColor: dayMode ? 'var(--day-mode-bg)' : 'var(--night-mode-bg)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      transition: 'background-color 2s ease, color 2s ease'
    },
    celestialBody: {
      position: 'absolute',
      left: '50%',
      zIndex: 10,
      animation: 'celestial-rise 10s infinite linear'
    },
    sunMoon: {
      width: dayMode ? '80px' : '64px',
      height: dayMode ? '80px' : '64px',
      borderRadius: '50%',
      backgroundColor: dayMode ? 'var(--sun-color)' : 'var(--moon-color)',
      boxShadow: dayMode ? 'var(--sun-shadow)' : 'var(--moon-shadow)',
      transition: 'width 2s ease, height 2s ease, background-color 2s ease, box-shadow 2s ease'
    },
    quoteContainer: {
      position: 'relative',
      zIndex: 40,
      marginBottom: '1rem',
      padding: '15px 25px',
      backgroundColor: dayMode ? 'var(--quote-bg-day)' : 'var(--quote-bg-night)',
      backdropFilter: 'blur(5px)',
      borderRadius: '20px',
      boxShadow: 'var(--box-shadow)',
      maxWidth: '90%',
      textAlign: 'center',
      transition: 'background-color 2s ease, color 2s ease'
    },
    quoteText: {
      fontSize: `${Math.max(1.25 * scaleFactor, 1)}rem`,
      fontWeight: 'bold',
      color: dayMode ? 'var(--day-mode-text)' : 'var(--night-mode-text)',
      margin: 0,
      textShadow: dayMode ? 'var(--day-mode-text-shadow)' : 'var(--night-mode-text-shadow)',
      transition: 'color 2s ease'
    },
    heading404: {
      fontSize: `${Math.max(20 * scaleFactor, 6)}rem`,
      fontWeight: 'bold',
      color: dayMode ? 'var(--day-mode-text-faint)' : 'var(--night-mode-text-faint)',
      margin: 0,
      textShadow: dayMode ? 'var(--day-mode-text-shadow-faint)' : 'var(--night-mode-text-shadow-faint)',
      lineHeight: 1,
      transition: 'color 2s ease'
    },
    cavemanContainer: {
      position: 'relative',
      width: '500px',
      height: '300px',
      zIndex: 30,
      display: 'flex',
      justifyContent: 'center',
      '@media (max-width: 768px)': {
        transform: 'scale(1.5)',
        transformOrigin: 'center center'
      },
      '@media (max-width: 480px)': {
        transform: 'scale(1.2)',
        transformOrigin: 'center center'
      }
    },
    shadow: {
      position: 'absolute',
      bottom: '40px',
      left: '80px',
      height: '12px',
      width: '350px',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      zIndex: -1
    },
    homeButton: {
      marginTop: `${40 * scaleFactor}px`,
      zIndex: 40
    },
    homeButtonLink: {
      display: 'inline-block',
      padding: '12px 24px',
      backgroundColor: dayMode ? 'var(--home-button-bg-day)' : 'var(--home-button-bg-night)',
      color: 'white',
      borderRadius: '30px',
      textDecoration: 'none',
      fontWeight: 'bold',
      boxShadow: 'var(--box-shadow)',
      transition: 'all 0.3s ease',
      fontSize: `${Math.max(1 * scaleFactor, 0.8)}rem`
    }
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --day-mode-bg: #F59E0B;
          --night-mode-bg: #312E81;
          --day-mode-text: rgba(0, 0, 0, 0.8);
          --night-mode-text: rgba(255, 255, 255, 0.8);
          --day-mode-text-faint: rgba(0, 0, 0, 0.1);
          --night-mode-text-faint: rgba(255, 255, 255, 0.1);
          --sun-color: #FBBF24;
          --moon-color: #E5E7EB;
          --sun-shadow: 0 0 15px 5px rgba(251, 191, 36, 0.5);
          --moon-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.3);
          --quote-bg-day: rgba(255, 255, 255, 0.2);
          --quote-bg-night: rgba(0, 0, 0, 0.2);
          --box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          --day-mode-text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.3);
          --night-mode-text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.3);
          --day-mode-text-shadow-faint: 4px 4px 0 rgba(0, 0, 0, 0.1);
          --night-mode-text-shadow-faint: 4px 4px 0 rgba(255, 255, 255, 0.1);
          --home-button-bg-day: #7C2D12;
          --home-button-bg-night: #4F46E5;
        }

        @import url('https://fonts.googleapis.com/css2?family=Concert+One&display=swap');

        body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          font-family: 'Concert One', system-ui, sans-serif;
        }

        @keyframes arm-anima {
          0%    { transform: rotate(0); }
          100%  { transform: rotate(-360deg); }
        }

        @keyframes head-anima {
          0%    { top: 25px; }
          42%   { top: 25px; }
          45%   { top: 50px; }
          100%  { top: 25px; }
        }

        @keyframes eye-anima {
          0%    { height: 5px; }
          42%   { height: 5px; }
          45%   { height: 1px; }
          100%  { height: 5px; }
        }

        @keyframes shadow-anima {
          0%    { width: 350px; left: 80px; }
          25%   { width: 450px; left: 80px; }
          50%   { width: 350px; left: 80px; }
          75%   { width: 450px; left: 0px; }
          100%  { width: 350px; left: 80px; }
        }

        @keyframes celestial-rise {
          0%   { transform: translate(-50%, 100vh); }
          20%  { transform: translate(-50%, 10vh); }
          40%  { transform: translate(-50%, -40vh); }
          60%  { transform: translate(-50%, -45vh); }
          80%  { transform: translate(-50%, 10vh); }
          100% { transform: translate(-50%, 100vh); }
        }

        @keyframes twinkle {
          0%   { opacity: 0.2; transform: scale(0.8); }
          100% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }

        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }

        .celestial-body {
          animation: celestial-rise 10s infinite linear;
        }

        .arm-left {
          animation: arm-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
        }

        .arm-right {
          animation: arm-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
          animation-delay: 0.6s;
        }

        .head-left {
          animation: head-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34) 0.6s;
        }

        .head-right {
          animation: head-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
        }

        .eye-left {
          animation: eye-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34) 0.6s;
        }

        .eye-right {
          animation: eye-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34);
        }

        .shadow {
          animation: shadow-anima 1.2s infinite cubic-bezier(.55,.01,.16,1.34) 0.1s;
        }

        .star {
          position: absolute;
          width: 2px;
          height: 2px;
          background-color: white;
          border-radius: 50%;
          animation: twinkle 3s infinite alternate;
        }

        .floating-quote {
          animation: float 3s ease-in-out infinite;
        }

        .pulsing-404 {
          animation: pulse 3s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .caveman-wrapper {
            transform: scale(2);
          }
        }

        @media (max-width: 480px) {
          .caveman-wrapper {
            transform: scale(1);
          }
        }
      `}</style>

      <Head>
        <title>404 - Page Not Found</title>
        <meta name="description" content="Oops! Our cavemen cannot find this page." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div style={styles.dayNightContainer} className={dayMode ? '' : 'night-mode'}>
        <div className="celestial-body" style={styles.celestialBody}>
          <div style={styles.sunMoon} />
        </div>

        {!dayMode && (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
            {generateStars(50).map((style, i) => (
              <div key={i} className="star" style={style} />
            ))}
          </div>
        )}

        <div className="floating-quote" style={styles.quoteContainer}>
          <p style={styles.quoteText}>{quote}</p>
        </div>

        <div className="pulsing-404" style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          marginBottom: '-50px'
        }}>
          <h1 style={styles.heading404}>404</h1>
        </div>

        <div className="caveman-wrapper" style={{
          position: 'relative',
          width: '500px',
          height: '300px',
          zIndex: 30,
          transformOrigin: 'center center',
        }}>
          <div className="shadow" style={styles.shadow}></div>
          <Caveman position="left" />
          <Caveman position="right" />
        </div>

        <div style={styles.homeButton}>
          <a href="/" style={styles.homeButtonLink} aria-label="Go back to homepage">
            Go Back Home
          </a>
        </div>
      </div>
    </>
  );
}

function generateStars(count) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
    });
  }
  return stars;
}

function Caveman({ position }) {
  const isLeft = position === 'left';

  const cavemanStyle = {
    position: 'absolute',
    height: '300px',
    width: '250px',
    ...(isLeft
      ? { left: '20px', transform: 'rotateY(180deg)' }
      : { right: '20px' })
  };

  return (
    <div style={cavemanStyle}>
      <div style={{
        position: 'absolute',
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        overflow: 'hidden',
        left: '50%',
        top: '70px',
        transform: 'translateX(-50%)',
        zIndex: 1
      }}>
        <div style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: isLeft ? '#D13433' : '#932422' }}>
          <div style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: isLeft ? '#932422' : '#D13433', left: '-12px', top: '80px' }}>
            <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: isLeft ? '#932422' : '#D13433', left: '50px', top: '10px' }}></div>
            <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: isLeft ? '#932422' : '#D13433', left: '60px', top: '45px' }}></div>
          </div>
          <div style={{ position: 'absolute', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: isLeft ? '#932422' : '#D13433', right: '10px', top: '0', transform: 'rotate(90deg)' }}>
            <div style={{ position: 'absolute', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: isLeft ? '#932422' : '#D13433', left: '65px', top: '10px' }}></div>
          </div>
        </div>
      </div>

      <div className={isLeft ? 'head-left' : 'head-right'} style={{
        position: 'absolute',
        width: '65px',
        height: '140px',
        backgroundColor: '#13242C',
        borderRadius: '50px',
        left: '60px',
        top: '25px',
        zIndex: 2
      }}>
        <div style={{ position: 'absolute', width: '7px', height: '20px', backgroundColor: 'black', borderRadius: '10px', left: '35px', top: '-8px', transform: 'rotate(20deg)' }}></div>
        <div style={{ position: 'absolute', width: '7px', height: '20px', backgroundColor: 'black', borderRadius: '10px', left: '30px', top: '-8px', transform: 'rotate(-20deg)' }}></div>

        <div style={{ position: 'absolute', width: '48px', height: '16px', backgroundColor: '#EAB08C', borderRadius: '50px', left: '45%', top: '40px', transform: 'translateX(-50%)' }}>
          <div className={isLeft ? 'eye-left' : 'eye-right'} style={{ position: 'absolute', width: '5px', height: '5px', backgroundColor: 'black', borderRadius: '50%', top: '50%', left: '5px', transform: 'translateY(-50%)' }}></div>
          <div className={isLeft ? 'eye-left' : 'eye-right'} style={{ position: 'absolute', width: '5px', height: '5px', backgroundColor: 'black', borderRadius: '50%', top: '50%', right: '9px', transform: 'translateY(-50%)' }}></div>

          <div style={{ position: 'absolute', width: '15px', height: '35px', backgroundColor: '#D9766C', borderLeft: '8px solid rgba(0, 0, 0, 0.1)', borderRadius: '10px', left: '45%', top: '12px', transform: 'translate(-50%, -50%)' }}></div>
        </div>
      </div>

      <div className={isLeft ? 'arm-left' : 'arm-right'} style={{
        position: 'absolute',
        width: '60px',
        height: '180px',
        backgroundColor: '#EAB08C',
        borderLeft: '8px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '50px',
        left: '135px',
        top: '80px',
        transformOrigin: '30px 30px',
        zIndex: 3
      }}>
        <div style={{
          position: 'absolute',
          width: '0',
          height: '0',
          borderBottom: '110px solid #601513',
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          left: '-60px',
          top: '120px',
          transform: 'rotate(70deg)'
        }}>
          <div style={{ position: 'absolute', width: '20px', height: '20px', backgroundColor: '#601513', borderRadius: '50%', left: '0', top: '-10px' }}></div>
          <div style={{ position: 'absolute', width: '40px', height: '40px', backgroundColor: '#601513', borderRadius: '50%', left: '-10px', top: '90px' }}></div>
        </div>
      </div>

      <Leg
        position="first"
        left="95px"
        bg="#B2524D"
        afterBg="#B2524D"
        footBg="#B2524D"
        footAfterBg="#B2524D"
        showFootBefore={false}
      />
      <Leg
        position="second"
        left="115px"
        bg="#D9766C"
        afterBg="#D9766C"
        footBg="#D9766C"
        footAfterBg="#EAB08C"
        showFootBefore={true}
      />
    </div>
  );
}

function Leg({ position, left, bg, afterBg, footBg, footAfterBg, showFootBefore }) {
  return (
    <div style={{ position: 'absolute', width: '10px', height: '55px', backgroundColor: bg, borderRadius: '10px', left: left, top: '200px' }}>
      <div style={{ position: 'absolute', width: '10px', height: '10px', backgroundColor: afterBg, borderRadius: '50%', left: '-5px', top: '15px' }}></div>

      <div style={{ position: 'absolute', width: '50px', height: '25px', backgroundColor: footBg, borderRadius: '25px 25px 0 0', left: '-38px', top: '30px' }}>
        <div style={{ position: 'absolute', width: '15px', height: '15px', backgroundColor: footAfterBg, borderRadius: '50%', bottom: '0', left: '-6px' }}></div>

        {showFootBefore && (
          <div style={{ position: 'absolute', width: '15px', height: '15px', backgroundColor: '#EAB08C', borderRadius: '50%', bottom: '0', left: '8px', transform: 'scale(0.6)' }}></div>
        )}

        <div style={{ position: 'absolute', width: '15px', height: '15px', backgroundColor: '#EAB08C', borderRadius: '50%', bottom: '0', left: '15px', transform: 'scale(0.6)' }}>
          <div style={{ position: 'absolute', width: '15px', height: '15px', backgroundColor: '#EAB08C', borderRadius: '50%', bottom: '0', left: '11px' }}></div>
        </div>
      </div>
    </div>
  );
}

const quotes = [
  "We fired our developer and hired cavemen instead. Now we're back in the stone age.",
  "404: Developer evolved into a caveman. Can't find page.",
  "Our tech team went prehistoric. Sorry about that.",
  "Ooga booga! Page not found!",
  "While our cavemen figure out coding, maybe try another page?",
  "Technology is hard when your tools are made of stone.",
  "Progress.exe has stopped working. Reverting to caveman mode.",
  "This page disappeared faster than modern technology at a caveman reunion.",
  "We outsourced this page to 10,000 BC. Bad decision.",
  "Our servers have been clubbed into submission.",
  "Cave paintings loaded successfully. Modern web page not so much.",
  "Fire good. Missing page bad.",
  "404 B.C.: Page not invented yet.",
  "This URL has gone extinct like dinosaurs.",
  "We're still evolving our web development skills. Please be patient."
];