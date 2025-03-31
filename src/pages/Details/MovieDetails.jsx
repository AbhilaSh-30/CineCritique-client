import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Play,
  Star,
  Calendar,
  Clapperboard,
} from "lucide-react";
import NavBar from "@/components/NavBar";
import { AppContext } from "@/context/AppContext";
import RecommendationSlider from "@/components/Sliders/RecommendationSlider";
import ReviewSlider from "@/components/Sliders/ReviewSlider";
import MediaTabs from "@/components/Tabs/MediaTabs";
import CrewTabs from "@/components/Tabs/CrewTabs";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { userData, backendURL } = useContext(AppContext);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/details/movies/${id}`
        );
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchMovieReviews = async () => {
      try {
        const response = await axios.get(
          `${backendURL}/api/reviews/review/${id}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching movie reviews:", error);
      }
    };

    fetchMovieDetails();
    fetchMovieReviews();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newReview = { movieId: id, userName: userData.name, reviewText };
    console.log(newReview);

    try {
      const response = await axios.post(
        `${backdropUrl}/api/reviews/review`,
        newReview,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        setReviews([...reviews, response.data]);
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;
  if (!movie)
    return <p className="text-center mt-10 text-lg">Movie not found</p>;

  const {
    details,
    credits,
    images,
    recommendations,
    videos,
    watchProviders,
    indianReleaseInfo,
  } = movie;

  const posterUrl = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
  const backdropUrl = `https://image.tmdb.org/t/p/original${details.backdrop_path}`;
  const trailer = videos.results.find((vid) => vid.type === "Trailer");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen bg-slate-200 dark:bg-gray-900 w-full p md:pb-8"
    >
      <div className="p-4 md:p-8 py-4 md:py-4">
        <NavBar />
      </div>
      {/* Background Banner */}
      <div
        className="relative h-[80vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-slate-200 via-slate-200/40 dark:from-gray-900 dark:via-gray-900/70 to-transparent"></div>
      </div>

      {/* Movie Info Section */}
      <div className="container mx-auto px-4 lg:px-20 -mt-32 relative z-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <img
            src={posterUrl}
            alt={details.title}
            className="w-64 rounded-lg shadow-lg mx-auto md:mx-0"
          />

          {/* Movie Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold">{details.title}</h1>
            <p className="text-gray-800 dark:text-gray-400 my-2">{details.tagline}</p>

            {/* Movie Info Icons */}
            <div className="flex gap-4 text-gray-800 dark:text-gray-300 mt-3">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400" size={20} />
                <span>{details.vote_average.toFixed(1)}/10</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={20} />
                <span>{details.release_date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clapperboard size={20} />
                <span>{details.runtime} min</span>
              </div>
            </div>

            {/* Overview */}
            <p className="mt-4 text-gray-800 dark:text-gray-300">{details.overview}</p>

            {/* Watch Providers */}
            {watchProviders.results?.IN && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Where to Watch</h3>
                <p className="text-gray-800 dark:text-gray-300">
                  Available on:{" "}
                  {watchProviders.results.IN.flatrate
                    ?.map((p) => p.provider_name)
                    .join(", ")}
                </p>
              </div>
            )}

            {/* Certification */}
            {indianReleaseInfo && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Indian Release</h3>
                <p className="text-gray-800 dark:text-gray-300">
                  Certification: {indianReleaseInfo[0]?.certification || "N/A"}{" "}
                  | Release Date:{" "}
                  {new Date(indianReleaseInfo[0]?.release_date).toDateString()}
                </p>
              </div>
            )}

            {/* Trailer Button */}
            {trailer && (
              <a
                href={`https://www.youtube.com/watch?v=${trailer.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center text-white gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
              >
                <Play size={20} />
                Watch Trailer
              </a>
            )}
          </div>
        </div>

        {/*  Cast and Crew Section */}
        <CrewTabs credits={credits} />

        {/* Gallery Section */}
        <MediaTabs images={images} videos={videos} />

        {/* Review Section */}
        <div className="mt-10 dark:bg-gray-900 bg-slate-200 rounded-lg">
          <h2 className="text-2xl font-semibold mt-10">Reviews</h2>
          <ReviewSlider reviews={reviews} />
        </div>

        {!submitted && (
          <div className="mt-6 w-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Post a Review
            </h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <textarea
                placeholder="Your Review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="p-2 rounded bg-slate-200 dark:bg-gray-700 text-black dark:text-white border border-gray-600 focus:outline-none"
                required
              ></textarea>
              <button
                type="submit"
                className="bg-red-600 hover:bg-red-700 p-2 rounded-lg text-white font-semibold"
              >
                {userData ? "Submit Review" : "Login to Review"}
              </button>
            </form>
          </div>
        )}

        {/* Recommended Movies */}
        {recommendations.results.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">You Might Also Like</h2>
            <RecommendationSlider
              recommendations={recommendations.results.slice(0, 14)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MovieDetails;
