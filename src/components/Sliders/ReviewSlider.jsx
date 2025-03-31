import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewSlider = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, reviews.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  if (reviews.length === 0) {
    return <p className="text-center text-gray-800 dark:text-gray-500 py-8">No reviews available</p>;
  }

  return (
    <div className="relative flex items-center justify-center w-full p-6">
      <button
        onClick={prevSlide}
        className="absolute left-0 p-2 bg-red-600 dark:bg-gray-700 hover:bg-red-700 dark:hover:bg-gray-600 rounded-full z-10"
      >
        <ChevronLeft size={24} className='text-white'/>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        {reviews.slice(currentIndex, currentIndex + itemsPerPage).map((review, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 shadow-lg rounded-2xl p-6 text-center h-full">
              <h2 className="text-xl font-semibold text-white">{review.userName}</h2>
              <p className="text-white dark:text-gray-300 mt-2">"{review.reviewText}"</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={nextSlide}
        className="absolute right-0 p-2 bg-red-600 dark:bg-gray-700 hover:bg-red-700 dark:hover:bg-gray-600 rounded-full z-10"
      >
        <ChevronRight size={24} className='text-white'/>
      </button>
    </div>
  );
};

export default ReviewSlider;