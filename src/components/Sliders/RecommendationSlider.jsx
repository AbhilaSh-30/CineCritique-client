import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Image from '../../assets/image.png';

const RecommendationSlider = ({ recommendations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 7;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, recommendations.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full">
      <button
        onClick={prevSlide}
        className="absolute left-0 p-2 bg-red-600 dark:bg-gray-700 rounded-full hover:bg-red-700 dark:hover:bg-gray-600 z-10 -ml-4"
      >
        <ChevronLeft size={24} className='text-white'/>
      </button>

      <div className="flex overflow-hidden w-full">
        <div className="flex gap-4 transition-transform duration-300">
          {recommendations.slice(currentIndex, currentIndex + itemsPerPage).map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-[150px] text-center"
            >
              <Link to={`/movies/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                  className="w-36 h-48 rounded-lg object-cover mx-auto hover:scale-102 transition-transform"
                  onError={(e) => {
                    e.target.src = Image;
                  }}
                />
                <p className="mt-2 text-sm font-medium">{movie.title}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 p-2 bg-red-600 dark:bg-gray-700 rounded-full hover:bg-red-700 dark:hover:bg-gray-600 z-10 -mr-4"
      >
        <ChevronRight size={24} className='text-white'/>
      </button>
    </div>
  );
};

export default RecommendationSlider;