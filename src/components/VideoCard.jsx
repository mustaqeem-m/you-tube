import React from 'react';
import { Link } from 'react-router-dom';

const VideoCard = ({ video }) => {
  // 🛡️ Safety check to prevent crashes
  if (!video?.snippet) return null;
  const videoId = typeof video.id === 'object' ? video.id.videoId : video.id;

  const { snippet } = video;
  const { title, thumbnails, channelTitle } = snippet;

  // 🖼️ Fallback to medium if maxres doesn't exist
  const thumbnailUrl =
    thumbnails?.maxres?.url || thumbnails?.high?.url || thumbnails?.medium?.url;

  return (
    <Link to={'/watch?v=' + videoId}>
      <div className="group cursor-pointer w-72 flex flex-col gap-2 m-2 transition-all duration-300 hover:scale-105">
        {/* Image Container with Shadow & Rounded Corners */}
        <div className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <img
            className="h-40 w-full object-cover group-hover:opacity-90 transition-opacity"
            alt={title}
            src={thumbnailUrl}
          />
          {/* Optional: Overlay gradient on hover */}
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col px-1">
          {/* Title with 2-line truncation */}
          <h3 className="font-bold text-gray-900 dark:text-white text-base line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Channel Name styling */}
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 font-medium">
            {channelTitle || 'Unknown Channel'}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
