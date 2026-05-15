import React from 'react';
import { motion } from 'framer-motion';

const events = [
  {
    title: "The Random Snap 🍾",
    text: "It all started from the most random thing ever… a snap of a daaru bottle 😭"
  },
  {
    title: "Late Night Talks 🌙",
    text: "One conversation somehow turned into hours of getting to know each other."
  },
  {
    title: "17th May ❤️",
    text: "The day we finally confessed what we truly felt."
  },
  {
    title: "The First Meeting 💫",
    text: "When we finally met each other and everything just clicked perfectly."
  },
  {
    title: "Long Distance Things ✈️",
    text: "Bridging the miles with endless FaceTimes, virtual dates, and counting down the days until we meet."
  },
  {
    title: "Our Little World 🌍",
    text: "Building our own safe space amidst all the chaos. Since then, life has never felt the same."
  },
  {
    title: "Today",
    text: "2 years later… and I still fall for you every single day."
  }
];

const OurStory = () => {
  return (
    <section id="our-story" className="relative w-full h-full flex flex-col items-center justify-center pt-24 pb-12">
      <h2 className="text-3xl md:text-5xl font-serif font-bold text-glow mb-12">Our Story</h2>
      
      <div className="relative max-w-xl w-full px-4">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-rose-900 via-rose-500 to-rose-900 opacity-40" />

        {events.map((event, index) => {
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative flex items-center mb-10 w-full"
            >
              {/* Timeline Dot */}
              <div className="absolute left-6 w-3 h-3 rounded-full bg-rose-400 border-[3px] border-bg-dark transform -translate-x-1/2 box-glow z-10" />

              {/* Card Container */}
              <div className="w-full pl-12 pr-2">
                <motion.div
                  className="glass-card p-5 relative w-full border border-rose-500/20"
                >
                  <div className="relative">
                    <h3 className="text-lg font-serif font-bold text-rose-200 mb-2">{event.title}</h3>
                    <p className="text-rose-50/80 leading-snug font-light text-sm">{event.text}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default OurStory;
