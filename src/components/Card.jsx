import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Image from "../assets/image.png";

const Card = ({ image, name, link, category }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    let route = "/";

    switch (category) {
      case "movies":
        route = `/movies/${link}`;
        break;
      case "tv":
        route = `/tv/${link}`;
        break;
      case "person":
        route = `/persons/${link}`;
        break;
      default:
        route = "/";
    }

    navigate(route);
  };

  return (
    <motion.div
      className="group relative h-full rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-300"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
    >
      <div className="aspect-[2/3] overflow-hidden bg-gray-300 dark:bg-gray-700">
        <motion.img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onError={(e) => {
            e.target.src = Image;
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300" />

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-bold text-lg">{name}</h3>
      </div>
    </motion.div>
  );
};

export default Card;
