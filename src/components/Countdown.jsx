import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('May 17, 2026 00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      let distance = targetDate - now;

      // If the date has passed this year, set for next year (or just show 0 if it's the day of)
      if (distance < 0) {
        const nextYear = new Date().getFullYear() + 1;
        distance = new Date(`May 17, ${nextYear} 00:00:00`).getTime() - now;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="relative w-full py-24 flex flex-col items-center px-4">
      <h2 className="text-3xl md:text-4xl font-serif font-medium text-rose-200 mb-12 text-center">
        Counting down to 17th May...
      </h2>

      <div className="flex flex-wrap justify-center gap-4 md:gap-8">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="w-20 h-24 md:w-28 md:h-32 glass border border-rose-500/50 rounded-xl flex items-center justify-center box-glow relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-rose-500/10" />
              <span className="text-4xl md:text-5xl font-serif font-bold text-rose-50">
                {String(unit.value).padStart(2, '0')}
              </span>
              
              {/* Animated glowing border effect */}
              <motion.div
                className="absolute inset-0 border-2 border-rose-400/0 rounded-xl"
                animate={{ borderColor: ['rgba(251,113,133,0)', 'rgba(251,113,133,0.5)', 'rgba(251,113,133,0)'] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              />
            </div>
            <span className="mt-4 text-rose-200 uppercase tracking-widest text-xs md:text-sm font-medium">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Floating Particles around timer */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-rose-400 rounded-full"
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -50],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Countdown;
