import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const MediaSlider = ({ media, type = "backdrop" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = type === "poster" ? 6 : 1;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % media.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0
        ? Math.max(0, media.length - itemsPerPage)
        : prevIndex - itemsPerPage
    );
  };

  if (!media || media.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">No {type}s available</p>
    );
  }

  const imageSize = type === "poster" ? "w-[150px] h-[225px]" : "w-full h-full";

  return (
    <div
      className={`relative ${type === "poster" ? "flex items-center justify-center w-full" : "w-full h-64 md:h-96 lg:h-[500px]"} rounded-lg`}
    >
      {/* Navigation Arrows */}
      {media.length > itemsPerPage && (
        <>
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-red-600 dark:bg-gray-700 hover:bg-red-700 dark:hover:bg-gray-600 rounded-full z-10 text-white -ml-4`}
            aria-label={`Previous ${type}`}
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-red-600 dark:bg-gray-700 hover:bg-red-700 dark:hover:bg-gray-600 rounded-full z-10 text-white -mr-4`}
            aria-label={`Next ${type}`}
          >
            <ChevronRight size={32} />
          </button>
        </>
      )}

      {/* Media Items */}
      <div
        className={`flex ${type === "poster" ? "gap-7" : ""} h-full transition-transform duration-300`}
      >
        {media
          .slice(currentIndex, currentIndex + itemsPerPage)
          .map((item, index) => (
            <motion.div
              key={`${item.file_path}-${index}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className={`${type === "poster" ? "flex-shrink-0" : "w-full"}`}
            >
              <img
                src={`https://image.tmdb.org/t/p/original${item.file_path}`}
                alt={`${type === "poster" ? "Movie poster" : "Movie backdrop"}`}
                className={`${imageSize} object-cover rounded-lg ${type === "poster" ? "hover:scale-102 transition-transform cursor-pointer" : ""}`}
                loading="lazy"
              />
            </motion.div>
          ))}
      </div>

      {/* Dots Indicator - Only for backdrop mode */}
      {type === "backdrop" && media.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-10">
          <div className="flex items-center justify-center gap-1">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              className="p-1 text-white/50 hover:text-white"
              aria-label="Previous dots"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex gap-1 mx-2">
              {Array.from({ length: Math.min(10, media.length) }).map((_, i) => {
                const dotIndex =
                  Math.min(
                    Math.max(0, currentIndex - 3),
                    Math.max(0, media.length - 7)
                  ) + i;
                return (
                  <button
                    key={dotIndex}
                    onClick={() => setCurrentIndex(dotIndex)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentIndex === dotIndex ? "bg-white w-6" : "bg-white/50"
                    }`}
                    aria-label={`Go to ${type} ${dotIndex + 1}`}
                  />
                );
              })}
            </div>

            <button
              onClick={() =>
                setCurrentIndex(Math.min(media.length - 1, currentIndex + 1))
              }
              className="p-1 text-white/50 hover:text-white"
              aria-label="Next dots"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaSlider;
