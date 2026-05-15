import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const letterText = `Heyyy babyyyyyy ,

I still remember how all of this started from the most random thing na ...darruuuuu ki bottle 😆🤣
So funny hor something soo small can changed the way I live and became the besssttttest thing that has happened to me

I know there were a lots of ups and downs but thennnn....
Came 17th May ...The day we confessed or maybe stopperd pretending what we both felt 

Somehow u became my comfort place, My safest person to whom I can share anything, and one of the biggest reasons behind my smile 

Ik I'm not good at expressing things. There is always soo much that I want to say but the words never come out and it ends up getting worse 

But one thing that I need u to know is this :
No matter what happens. I'll never leave your side .

Even when the whole world feels against u. I'll be still there clapping for your smallest achievements like they mean everything cuz they actually do.

Thank you for loving me like u do.
Thank you for making ordinary days feel special.

And if I had to choose again... In every universe, every timeline or even every lifetime...
I'd still choose you without any single thought 

Happyyyy 2 Yearsss Saanuuuuu💓

~Apka Nalayk sa Bacha Hehe 😈`;

const LoveLetter = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && !isTyping && displayedText.length === 0) {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typeChar = () => {
        if (currentIndex < letterText.length) {
          setDisplayedText(letterText.slice(0, currentIndex + 1));
          currentIndex++;
          // Variable typing speed for a more human feel
          const delay = letterText[currentIndex - 1] === '\n' ? 400 : Math.random() * 30 + 20;
          setTimeout(typeChar, delay);
        } else {
          setIsTyping(false);
        }
      };
      
      setTimeout(typeChar, 1000);
    }
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative w-full py-32 flex flex-col items-center px-4 overflow-hidden">
      {/* Floating Rose Petals Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 rounded-full bg-rose-600/40 blur-[2px]"
            style={{
              borderRadius: '50% 0 50% 50%',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, 200],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1 }}
        className="glass-card max-w-2xl w-[90%] max-h-[80vh] overflow-y-auto p-6 md:p-12 relative z-10 box-glow"
      >
        <h2 className="text-2xl md:text-4xl font-serif font-bold text-center text-rose-300 mb-6 tracking-wider sticky top-0 bg-black/40 backdrop-blur-sm py-2 z-20 rounded-t-xl -mt-2 -mx-2">
          To My Sanuuuu ❤️
        </h2>
        
        <div className="font-serif text-base md:text-xl leading-relaxed text-rose-50/90 whitespace-pre-wrap">
          {displayedText}
          {(isTyping || displayedText.length === 0) && (
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2 h-4 md:h-5 bg-rose-400 ml-1 translate-y-1"
            />
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default LoveLetter;
