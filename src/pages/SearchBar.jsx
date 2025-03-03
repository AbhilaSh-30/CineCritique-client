import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search, Moon, Sun, Film, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from '../components/Card';
import NavBar from '../components/NavBar';

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [movieName, setMovieName] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (movieName.length === 0) {
        setSearchResult(null);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/search/movies/${movieName}`)
          .then((res) => {
            const formattedResults = res.data.map((movie) => ({
              movieLink: movie.id,
              movieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              movieTitle: movie.title,
            }));
            setSearchResult(formattedResults);
            setIsLoading(false);
          })
          .catch((err) => {
            console.error('Error fetching search results:', err);
            setIsLoading(false);
          });
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [movieName]);

  const clearSearch = () => {
    setMovieName("")
    setSearchResult([])
    setIsSearchActive(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-black transition-colors duration-300 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <motion.div
          initial={{ y: -1, opacity: 1 }}
          animate={{
            y: isSearchActive ? 0 : "10vh",
            scale: isSearchActive ? 1 : 1.05,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative z-10 mb-8 md:mb-16"
        >
          <div className="flex flex-col items-center">
            {!isSearchActive && (
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl md:text-5xl font-bold text-center mb-6 text-gray-800 dark:text-white"
              >
                Discover Your Next <span className="text-red-600 dark:text-red-500">Favorite Movie</span>
              </motion.h1>
            )}

            <div className="relative w-full max-w-2xl mx-auto">
              <motion.div
                className="flex w-full rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700"
                whileFocus={{ scale: 1.02 }}
                layout
              >
                <div className="flex items-center px-4 text-gray-400 dark:text-gray-500">
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                    >
                      <Search className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                </div>
                <input
                  type="text"
                  value={movieName}
                  onChange={(e) => {
                    setMovieName(e.target.value)
                    setIsSearchActive(true)
                  }}
                  onFocus={() => setIsSearchActive(true)}
                  className="w-full py-2 px-2 md:py-4 md:px-2 text-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Search for movies..."
                />
                {movieName && (
                  <button
                    onClick={clearSearch}
                    className="px-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
                <button className="px-2 md:px-6 md:py-4 bg-red-600 hover:bg-red-700 text-white font-medium transition-colors">
                  Search
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {searchResult && movieName.trim() !== "" && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 20 }}
              className="pt-4"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xl font-semibold mb-6 text-gray-800 dark:text-white"
              >
                Found {searchResult.length} results for "{movieName}"
              </motion.h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {searchResult.map((movie, index) => (
                  <motion.div key={`${movie.movieLink}-${index}`} variants={itemVariants}>
                      <MovieCard image={movie.movieImage} name={movie.movieTitle} link={movie.movieLink} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSearchActive && movieName && !searchResult && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <Film className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No movies found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                We couldn't find any movies matching "{movieName}". Try a different search term.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default SearchBar;
