import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const TvDetails = () => {
  const { id } = useParams();
  const [tv, setTv] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTvDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/details/tv/${id}`
        );
        setTv(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTvDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{tv.name}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
        alt={tv.name}
        className="w-64 my-4"
      />
      <p>{tv.overview}</p>
    </div>
  );
};

export default TvDetails;
