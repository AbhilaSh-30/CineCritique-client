import React, { useState } from "react";
import CastSlider from "../Sliders/CastSlider";

const CrewTabs = ({credits}) => {
    const [activeTab, setActiveTab] = useState('cast');

  return (
    <div className="mt-10">
      <div className="flex gap-4 mb-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("cast")}
          className={`text-xl font-semibold pb-2 ${
            activeTab === "cast"
              ? "dark:text-white text-2xl border-b-2 border-red-600"
              : "dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-black"
          }`}
        >
          Cast
        </button>
        <button
          onClick={() => setActiveTab("crew")}
          className={`text-xl font-semibold pb-2 ${
            activeTab === "crew"
              ? "dark:text-white text-2xl border-b-2 border-red-600"
              : "dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-black"
          }`}
        >
          Crew
        </button>
      </div>

      {activeTab === "cast" ? (
        <CastSlider cast={credits.cast} />
      ) : (
        <CastSlider cast={credits.crew} />
      )}
    </div>
  );
};

export default CrewTabs;
