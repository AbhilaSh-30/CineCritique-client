import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Search, Film, X } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../components/Card';
import NavBar from '../components/NavBar';

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [queryName, setqueryName] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const searchCategory = params.get("category") || "movies";
  
  const { userData, backendURL, setUserData, setIsLoggedIn } = useContext(AppContext);

  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (queryName.length === 0) {
        setSearchResult(null);
        setIsLoading(false);
      } else {
        setIsLoading(true);
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/search/${searchCategory}/${queryName}`)
          .then((res) => {
            const formattedResults = res.data.map((item) => ({
              queryLink: item.id,
              queryImage: getImageUrl(item),
              queryTitle: getTitle(item),
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
  }, [queryName,searchCategory]);

  const getTitle = (item) => {
    if (searchCategory === "movies") return item.title;
    if (searchCategory === "tv") return item.title;
    if (searchCategory === "person") return item.name;
    return "Unknown";
  };

  // Dynamically get image based on search category
  const getImageUrl = (item) => {
    if (item.poster_path) return `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    if (item.profile_path) return `https://image.tmdb.org/t/p/w500${item.profile_path}`;
    return "https://via.placeholder.com/500x750?text=No+Image";
  };

  const clearSearch = () => {
    setqueryName("")
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
        <div className='mb-15'>
          <NavBar />
        </div>
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
                {userData ? userData.name : "Hey User"}, Discover Your {searchCategory === ("movies" || "tv") ? "Next" : ""} <span className="text-red-600 dark:text-red-500">Favorite {searchCategory === "movies" ? "Movies" : searchCategory === "tv" ? "TV Shows" : "Persons"}</span>
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
                  value={queryName}
                  onChange={(e) => {
                    setqueryName(e.target.value)
                    setIsSearchActive(true)
                  }}
                  onFocus={() => setIsSearchActive(true)}
                  className="w-full py-2 px-2 md:py-2 md:px-2 text-lg bg-transparent outline-none text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder={`Search for ${searchCategory === "movies" ? "Movies..." : searchCategory === "tv" ? "Tv shows..." : "Persons..."}`}
                />
                {queryName && (
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
          {searchResult && queryName.trim() !== "" && (
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
                Found {searchResult.length} results for "{queryName}"
              </motion.h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {searchResult.map((query, index) => (
                  <motion.div key={`${query.queryLink}-${index}`} variants={itemVariants}>
                      <Card image={query.queryImage} name={query.queryTitle} link={query.queryLink} category={searchCategory} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSearchActive && queryName && !searchResult && !isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <div className="w-16 h-16 mb-4 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <Film className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-2">No {searchCategory === "movies" ? "movies" : searchCategory === "tv" ? "tv shows" : "persons"} found</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md">
                We couldn't find any {searchCategory === "movies" ? "movies" : searchCategory === "tv" ? "tv shows" : "persons"} matching "{queryName}". Try a different search term.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default SearchBar;
