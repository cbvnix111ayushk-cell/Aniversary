import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
import HeroSection from './components/HeroSection';
import OurStory from './components/OurStory';
import PhotoGallery from './components/PhotoGallery';
import MusicPlayer from './components/MusicPlayer';
import LoveLetter from './components/LoveLetter';
import Reasons from './components/Reasons';
import Countdown from './components/Countdown';
import FinalSection from './components/FinalSection';
import EasterEgg from './components/EasterEgg';
import CursorGlow from './components/CursorGlow';
import FloatingHearts from './components/FloatingHearts';
import MobileNavDots from './components/MobileNavDots';

function App() {
  const [showOpening, setShowOpening] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef(null);

  useEffect(() => {
    // Show opening screen for 4 seconds
    const timer = setTimeout(() => {
      setShowOpening(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartInteraction = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  const handleScroll = () => {
    if (mainRef.current) {
      const scrollPos = mainRef.current.scrollTop;
      const windowHeight = window.innerHeight;
      const index = Math.round(scrollPos / windowHeight);
      setActiveIndex(index);
    }
  };

  return (
    <div className="relative h-screen w-full bg-bg-dark text-rose-50 overflow-hidden font-sans" onClick={handleStartInteraction}>
      <CursorGlow />
      <FloatingHearts />
      <EasterEgg />

      <AnimatePresence mode="wait">
        {showOpening ? (
          <OpeningScreen key="opening" />
        ) : (
          <>
            <MobileNavDots activeIndex={activeIndex} />
            <main 
              ref={mainRef}
              onScroll={handleScroll}
              key="main" 
              className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth"
            >
              <div className="snap-start min-h-screen"><HeroSection /></div>
              <div className="snap-start min-h-screen"><OurStory /></div>
              <div className="snap-start min-h-screen flex items-center justify-center py-12"><PhotoGallery /></div>
              <div className="snap-start min-h-screen flex items-center justify-center py-12"><LoveLetter /></div>
              <div className="snap-start min-h-screen flex items-center justify-center py-12"><Reasons /></div>
              <div className="snap-start min-h-screen flex items-center justify-center py-12"><Countdown /></div>
              <div className="snap-start min-h-screen"><FinalSection /></div>
            </main>
            <MusicPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
