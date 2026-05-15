import React from 'react';

const MobileNavDots = ({ activeIndex }) => {
  const sections = 7; // Hero, OurStory, PhotoGallery, LoveLetter, Reasons, Countdown, Final

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none md:hidden">
      {[...Array(sections)].map((_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            activeIndex === i 
              ? 'bg-rose-500 scale-150 box-glow' 
              : 'bg-white/20'
          }`}
        />
      ))}
    </div>
  );
};

export default MobileNavDots;
