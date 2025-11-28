import useFetchVideo from '@/hooks/useFetchVideo'; // Corrected import path
import React from 'react';
import VideoCard from './VideoCard'; // We will create this component next
import useInfiniteScroll from '@/hooks/useInfiniteScroll';

const VideoContainer = () => {
  const { videos, loading, error, loadMore } = useFetchVideo();
  const [isFetching, setIsFetching] = useInfiniteScroll(loadMore);

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log(videos);
  return (
    <div className="w-full p-8">
      <div className="flex flex-wrap">
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      {loading && <div>Loading...</div>}
      {isFetching && !loading && 'fetching more videos'}
    </div>
  );
};

export default VideoContainer;
