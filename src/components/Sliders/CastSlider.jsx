import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from '../../assets/image.png';

const CastSlider = ({ cast }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 7;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % cast.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, cast.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <button
        onClick={prevSlide}
        className="absolute mb-10 left-0 p-2 bg-red-600 dark:bg-gray-700 rounded-full hover:bg-red-700 dark:hover:bg-gray-600 z-10 -ml-4"
      >
        <ChevronLeft size={24} className='text-white'/>
      </button>

      <div className="flex overflow-hidden w-full">
        <div className="flex gap-10 transition-transform duration-300">
          {cast.slice(currentIndex, currentIndex + itemsPerPage).map((actor) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-[120px] text-center"
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="w-30 h-40 rounded-2xl object-cover mx-auto"
                onError={(e) => {
                  e.target.src = Image;
                }}
              />
              <p className="mt-2 text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{actor.character || actor.job}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <button 
        onClick={nextSlide}
        className="absolute right-0 mb-10 p-2 bg-red-600 dark:bg-gray-700 rounded-full hover:bg-red-700 dark:hover:bg-gray-600 z-10 -mr-4"
      >
        <ChevronRight size={24} className='text-white'/>
      </button>
    </div>
  );
};

export default CastSlider;