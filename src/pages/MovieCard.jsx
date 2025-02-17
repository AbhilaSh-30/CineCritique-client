import React from 'react';

const MovieCard = ({ image, name }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={image} alt={name} className="w-full h-64 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-bold">{name}</h2>
      </div>
    </div>
  );
};

export default MovieCard;