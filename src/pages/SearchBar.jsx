import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [movieName, setMovieName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const searchBar = setTimeout(() => {
      if (movieName.length === 0) {
        setSearchResult(null);
      } else {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/search/movies/${movieName}`)
          .then((res) => {
            console.log(res.data);
            const formattedResults = res.data.map((movie) => ({
                movieLink: movie.id,
                movieImage: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movieTitle: movie.title,
              }));
              setSearchResult(formattedResults);
          })
          .catch((err) => {
            console.error('Error fetching search results:', err);
          });
      }
    }, 300);

    return () => clearTimeout(searchBar);
  }, [movieName]);

  const handleMovieClick = (movieName) => {
    navigate(`/m/${movieName}`);
  };

  return (
    <main className="max-w-screen min-h-screen bg-black">
      <div className="flex justify-between items-center sticky top-4 w-full px-12">
        {/* Empty div for spacing the left side */}
        <div className="flex w-1/4"></div>
  
        {/* Centered Search Bar */}
        <div className="flex justify-center w-1/2">
          <input
            type="text"
            onChange={(e) => setMovieName(e.target.value)}
            className="w-full bg-[rgba(255,255,255,0.25)] backdrop-blur-xl p-3 rounded-l-lg text-xl outline-none text-white"
            placeholder="Search by movies"
          />
          <button className="px-6 py-2 rounded-r-lg bg-[#B90000] text-white text-lg">
            Search
          </button>
        </div>
      </div>
  
      {/* Display Search Results */}
      <div className="w-[100%] py-12 px-24 top-24">
        {searchResult != null ? (
          <div>
            <ul className="flex gap-y-10 gap-x-8 flex-wrap">
              {searchResult.map((val, ind) => (
                <li key={ind} className="flex">
                  <Link
                    to={{ pathname: `/m/${val.movieLink}`}}
                  >
                    <MovieCard image={val.movieImage} name={val.movieTitle} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default SearchBar;