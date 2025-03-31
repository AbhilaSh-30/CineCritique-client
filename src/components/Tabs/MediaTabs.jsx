import React, { useState } from 'react';
import MediaSlider from '../Sliders/MediaSlider';
import VideoSlider from '../Sliders/VideoSlider';

const MediaTabs = ({ images, videos }) => {
  const [activeTab, setActiveTab] = useState('backdrops');
  
  const tabs = [
    { id: 'backdrops', label: 'Backdrops', visible: images?.backdrops?.length > 0 },
    { id: 'posters', label: 'Posters', visible: images?.posters?.length > 0 },
    { id: 'videos', label: 'Videos', visible: videos?.results?.length > 0 }
  ].filter(tab => tab.visible);

  if (tabs.length === 0) return null;

  return (
    <div className="mt-10">
      <div className="flex gap-4 mb-4 border-b border-gray-700">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`text-xl font-semibold pb-2 px-1 ${
              activeTab === tab.id
                ? 'dark:text-white border-b-2 border-red-600'
                : 'dark:text-gray-400 dark:hover:text-white text-gray-600 hover:text-black'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="mt-4">
        {activeTab === 'backdrops' && (
          <MediaSlider media={images.backdrops} type="backdrop" />
        )}
        {activeTab === 'posters' && (
          <MediaSlider media={images.posters} type="poster" />
        )}
        {activeTab === 'videos' && (
          <VideoSlider videos={videos.results} />
        )}
      </div>
    </div>
  );
};

export default MediaTabs;