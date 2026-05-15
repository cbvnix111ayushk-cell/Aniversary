import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const reasons = [
  "The way you always make me laugh 😊",
  "The way you care",
  "Your smile",
  "Our late night talks",
  "How safe you make me feel",
  "The way you stayed"
];

const Reasons = () => {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center pt-16 pb-8 overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-serif font-bold text-glow mb-8 text-center px-4">
        Why I Love You ❤️
      </h2>

      <motion.div ref={carouselRef} className="w-full cursor-grab overflow-hidden px-6 py-8">
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }} 
          className="flex gap-6 w-max"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              className="relative h-56 w-[260px] perspective-1000 group cursor-pointer"
            >
              <motion.div
                className="w-full h-full preserve-3d transition-transform duration-700 group-active:rotate-y-180 md:group-hover:rotate-y-180"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Front */}
                <div 
                  className="absolute inset-0 backface-hidden glass-card flex flex-col items-center justify-center p-6 text-center border border-rose-500/20"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <div className="text-5xl mb-4 opacity-80">✨</div>
                  <p className="text-rose-200 text-sm opacity-60">Hold to flip</p>
                </div>

                {/* Back */}
                <div 
                  className="absolute inset-0 backface-hidden glass-card flex items-center justify-center p-6 text-center rotate-y-180 box-glow border border-rose-500/50 bg-rose-950/40"
                  style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                >
                  <p className="font-serif text-xl text-rose-100 leading-relaxed font-medium">
                    {reason}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      <p className="text-white/40 text-sm mt-2 animate-pulse">Swipe & Hold cards</p>
    </section>
  );
};

export default Reasons;
