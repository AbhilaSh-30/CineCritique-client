import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Play, X } from 'lucide-react';
import { motion } from 'framer-motion';

const VideoSlider = ({ videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const itemsPerPage = 3;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage) % videos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Math.max(0, videos.length - itemsPerPage) : prevIndex - itemsPerPage
    );
  };

  const openVideo = (video) => {
    setSelectedVideo(video);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    document.body.style.overflow = 'auto';
  };

  if (!videos || videos.length === 0) {
    return <p className="text-center text-gray-500 py-8">No videos available</p>;
  }

  return (
    <>
      <div className="relative w-full">
        {/* Navigation Arrows */}
        {videos.length > itemsPerPage && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 p-2 bg-red-600 dark:bg-gray-700 hover:bg-red-700 dark:hover:bg-gray-600 rounded-full z-10 text-white -ml-4"
              aria-label="Previous videos"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 p-2 bg-red-600 dark:bg-gray-700 hover:bg-red-700 dark:hover:bg-gray-600 rounded-full z-10 text-white -mr-4"
              aria-label="Next videos"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.slice(currentIndex, currentIndex + itemsPerPage).map((video) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="relative group cursor-pointer"
              onClick={() => openVideo(video)}
            >
              <div className="relative aspect-video overflow-hidden rounded-lg bg-gray-800">
                <img
                  src={`https://img.youtube.com/vi/${video.key}/hqdefault.jpg`}
                  alt={video.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                </div>
              </div>
              <div className="mt-2">
                <h3 className="font-medium dark:text-white line-clamp-1">{video.name}</h3>
                <div className="flex gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>{video.type}</span>
                  {video.official && (
                    <span className="bg-green-600 text-white px-2 py-0.5 rounded text-xs">
                      Official
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={closeVideo}
            className="absolute top-4 right-4 text-white hover:text-red-500 z-50"
            aria-label="Close video"
          >
            <X size={32} />
          </button>
          
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo.key}?autoplay=1`}
              title={selectedVideo.name}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoSlider;