import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      const newHeart = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 2000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 1, scale: 0.5, y: heart.y, x: heart.x }}
            animate={{
              opacity: 0,
              scale: 1.5,
              y: heart.y - 150,
              x: heart.x + (Math.random() * 40 - 20),
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute text-rose-500 text-glow"
            style={{ left: 0, top: 0 }}
          >
            <Heart size={24} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
