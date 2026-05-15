import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

const EasterEgg = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 md:top-auto md:bottom-4 z-50 text-[10px] text-white/20 hover:text-white/80 transition-colors duration-300 font-sans"
      >
        Click if you love me 😭
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card p-8 flex flex-col items-center gap-4 border border-rose-500/30"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <Heart size={48} className="text-rose-500 text-glow" fill="currentColor" />
              </motion.div>
              <h2 className="text-3xl font-serif font-bold text-rose-50">I knew it ❤️</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/40 border border-rose-500/50 transition-all duration-300"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EasterEgg;
