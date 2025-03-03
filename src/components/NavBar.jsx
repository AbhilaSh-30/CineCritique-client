import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Film, Menu, X } from "lucide-react";

const NavBar = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="relative z-50 mb-6 md:mb-10 flex justify-between items-center">
      <motion.div
        className="flex items-center gap-2 text-gray-800 dark:text-white cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <Film className="w-6 h-6 text-red-600 dark:text-red-500" />
        <span className="text-xl font-bold">CineCritique</span>
      </motion.div>

      <div className="hidden md:flex space-x-8 items-center">
        {["Home", "Movies", "TV"].map((item) => (
          <motion.button
            key={item}
            className={`px-4 py-2 rounded-full text-lg font-semibold transition cursor-pointer ${
              activeTab === item
                ? "bg-red-600 text-white dark:bg-red-600"
                : "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.03 }}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </motion.button>
        ))}

        <div className="relative" ref={dropdownRef}>
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-lg font-semibold transition cursor-pointer ${
              activeTab === "Search"
                ? "bg-red-600 text-white dark:bg-red-600"
                : "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
            whileHover={{ scale: 1.03 }}
          >
            Search
          </motion.button>

          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 mt-2 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg overflow-hidden"
              >
                <Link
                  to="/search/movies"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setActiveTab("Search")}
                >
                  Search Movies
                </Link>
                <Link
                  to="/search/tv"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setActiveTab("Search")}
                >
                  Search TV Shows
                </Link>
                <Link
                  to="/search/actors"
                  className="block px-4 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                  onClick={() => setActiveTab("Search")}
                >
                  Search Actors
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={toggleDarkMode}
          className="p-3 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-pointer"
          aria-label="Toggle dark mode"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </motion.button>
      </div>

      <button
        className="md:hidden p-2 text-gray-800 dark:text-white"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-900 dark:to-black transition-colors duration-300 shadow-lg p-6 flex flex-col space-y-6 md:hidden z-50"
          >
            <button className="self-end p-2" onClick={toggleMobileMenu}>
              <X className="w-6 h-6 text-gray-800 dark:text-white" />
            </button>

            {["Home", "Movies", "TV"].map((item) => (
              <button
                key={item}
                className={`w-full text-left px-4 py-3 rounded-lg text-lg font-semibold transition ${
                  activeTab === item
                    ? "bg-red-600 text-white dark:bg-red-600"
                    : "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                onClick={() => {
                  setActiveTab(item);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item}
              </button>
            ))}

            <div ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full px-4 py-3 text-left rounded-lg text-lg font-semibold text-gray-800 dark:text-white ${
                  activeTab === "Search"
                    ? "bg-red-600 text-white dark:bg-red-600"
                    : "text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                Search
              </button>
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-2 w-full bg-white dark:bg-gray-800 border dark:border-gray-700 shadow-lg rounded-lg overflow-hidden"
                  >
                    <Link
                      to="/search/movies"
                      className="block px-4 py-2"
                      onClick={() => setActiveTab("Search")}
                    >
                      Search Movies
                    </Link>
                    <Link
                      to="/search/tv"
                      className="block px-4 py-2"
                      onClick={() => setActiveTab("Search")}
                    >
                      Search TV Shows
                    </Link>
                    <Link
                      to="/search/actors"
                      className="block px-4 py-2"
                      onClick={() => setActiveTab("Search")}
                    >
                      Search Actors
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button
              onClick={toggleDarkMode}
              className="w-full p-3 flex items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg"
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6" />
              ) : (
                <Moon className="w-6 h-6" />
              )}
              <span className="ml-2">Toggle Dark Mode</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBar;
