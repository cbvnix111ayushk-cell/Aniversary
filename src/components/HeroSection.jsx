import React from 'react';
import { motion } from 'framer-motion';
import { vibrate } from '../utils/haptics';

const HeroSection = () => {
  const handleScroll = () => {
    vibrate(50);
    // Since we're using scroll snapping, we can just scroll the main container by 1 window height
    const mainContainer = document.querySelector('main');
    if (mainContainer) {
      mainContainer.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full h-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Gradient & Blur Effects */}
      <div className="absolute top-[-10%] left-[-20%] w-80 h-80 md:w-96 md:h-96 bg-rose-900/40 rounded-full mix-blend-screen filter blur-[80px] opacity-70 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-20%] w-80 h-80 md:w-96 md:h-96 bg-purple-900/40 rounded-full mix-blend-screen filter blur-[80px] opacity-70" style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className="z-10 flex flex-col items-center text-center px-6 w-full"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-4 md:mb-6 text-glow leading-[1.1]">
          HAPPY 2 YEARS <br className="md:hidden" />
          <span className="text-rose-500 block mt-2 md:inline md:mt-0">SANU</span> ❤️
        </h1>
        
        <p className="text-base md:text-2xl font-light text-rose-100 max-w-2xl mb-10 md:mb-12 tracking-wide px-2">
          From a random snap… to my favorite person forever.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleScroll}
          className="w-full max-w-[280px] md:w-auto px-8 py-4 rounded-full glass border border-rose-500/50 text-rose-50 font-medium tracking-wider active:bg-rose-500/30 transition-all duration-300 box-glow"
        >
          Open Our Story
        </motion.button>
      </motion.div>

      {/* Floating Particles/Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-rose-300"
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
