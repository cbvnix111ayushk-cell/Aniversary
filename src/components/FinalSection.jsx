import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const FinalSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-200px" });

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-black/50">
      {/* Background Magic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Fireflies */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={`firefly-${i}`}
            className="absolute w-1.5 h-1.5 bg-yellow-200/80 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              boxShadow: '0 0 10px 2px rgba(253, 224, 71, 0.6)'
            }}
            animate={{
              y: [0, Math.random() * -100 - 50],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Fireworks Animation effect using scaled divs */}
        {isInView && [...Array(5)].map((_, i) => (
          <motion.div
            key={`firework-${i}`}
            className="absolute rounded-full border border-rose-500/30"
            style={{
              left: Math.random() * 60 + 20 + '%',
              top: Math.random() * 60 + 20 + '%',
            }}
            initial={{ width: 0, height: 0, opacity: 1 }}
            animate={{ width: 300, height: 300, opacity: 0 }}
            transition={{ duration: 2, delay: i * 0.8 + 1, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
        className="z-10 text-center px-4"
      >
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-glow mb-8 leading-tight"
        >
          And I’d still choose you…
          <br />
          <span className="text-rose-500 block mt-4">In every universe ❤️</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 2, delay: 3 }}
          className="mt-16"
        >
          <p className="font-serif text-2xl text-rose-200 handwritten-style mb-2">
            Forever Yours,
          </p>
          <p className="font-serif text-3xl font-bold text-rose-50">
            Ayush
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalSection;
