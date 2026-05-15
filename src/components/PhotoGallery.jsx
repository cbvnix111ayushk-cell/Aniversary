import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const photos = [
  { id: 1, src: "/photos/photo1.jpg", caption: "Always making me smile", rotation: -3 },
  { id: 2, src: "/photos/photo2.jpg", caption: "Vintage love ❤️", rotation: 2 },
  { id: 3, src: "/photos/photo3.jpg", caption: "Long distance things 🫶", rotation: -1 },
  { id: 4, src: "/photos/photo4.jpg", caption: "You & Me", rotation: 4 },
  { id: 5, src: "/photos/photo5.jpg", caption: "My favorite place to be", rotation: -2 },
];

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = window.innerWidth > 768 ? 400 : 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full h-full flex flex-col items-center justify-center pt-16 pb-8 overflow-hidden">
      <h2 className="text-3xl md:text-5xl font-serif font-bold text-glow mb-8 text-center px-4">
        Our Favorite Memories 📸
      </h2>

      <div className="relative w-full max-w-7xl mx-auto px-2 md:px-12 group">
        <button 
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-rose-500/80 hover:bg-rose-600 text-white p-3 rounded-full backdrop-blur-md transition-all shadow-lg shadow-rose-500/20"
          aria-label="Previous photo"
        >
          <ChevronLeft size={24} />
        </button>

        <div 
          ref={carouselRef} 
          className="w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory flex gap-6 px-4 py-8 scroll-smooth"
        >
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="min-w-[280px] md:min-w-[320px] snap-center bg-white p-3 pb-8 shadow-xl cursor-pointer relative group-item rounded-sm flex-shrink-0"
              style={{ rotate: photo.rotation }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="overflow-hidden aspect-square pointer-events-none">
                <img 
                  src={photo.src} 
                  alt={photo.caption}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="font-serif text-gray-800 text-center mt-4 text-xl tracking-wide opacity-80 handwritten-style pointer-events-none">
                {photo.caption}
              </p>
              
              {/* Floating doodles */}
              {index % 2 === 0 && (
                <div className="absolute -top-4 -right-4 text-rose-500 text-2xl rotate-12 opacity-60 pointer-events-none">✨</div>
              )}
              {index % 2 !== 0 && (
                <div className="absolute -bottom-4 -left-4 text-rose-500 text-2xl -rotate-12 opacity-60 pointer-events-none">💖</div>
              )}
            </motion.div>
          ))}
        </div>

        <button 
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-rose-500/80 hover:bg-rose-600 text-white p-3 rounded-full backdrop-blur-md transition-all shadow-lg shadow-rose-500/20"
          aria-label="Next photo"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      <p className="text-white/40 text-sm mt-4 animate-pulse">Swipe to see more &larr;&rarr;</p>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-4 pb-12 w-full max-w-sm rounded-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedPhoto.src} 
                alt={selectedPhoto.caption}
                className="w-full h-auto max-h-[60vh] object-contain"
              />
              <p className="font-serif text-gray-800 text-center mt-6 text-2xl tracking-wide handwritten-style">
                {selectedPhoto.caption}
              </p>
              <button 
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2 text-xl"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PhotoGallery;
