import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

const useFetchVideo = () => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // prevent double API calls
  const inFlight = useRef(false);
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const BASE_URL =
    'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=IN&maxResults=50&key=' +
    GOOGLE_API_KEY;

  const fetchVideos = async (pageToken = '') => {
    if (inFlight.current) return;
    inFlight.current = true;

    setLoading(true);
    setError(null);

    try {
      const url = pageToken ? BASE_URL + `&pageToken=${pageToken}` : BASE_URL;

      const res = await axios.get(url);

      setVideos((prev) => [...prev, ...res.data.items]);
      setNextPageToken(res.data.nextPageToken || '');
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.error || 'Failed to fetch YouTube videos');
    } finally {
      setLoading(false);
      inFlight.current = false;
    }
  };

  // initial load
  useEffect(() => {
    fetchVideos();
    // eslint-disable-next-line
  }, []); // no dependencies → stable

  // for infinite scroll: call this
  const loadMore = () => {
    if (loading) return;
    if (!nextPageToken) return;
    fetchVideos(nextPageToken);
  };

  return { videos, loading, error, loadMore };
};

export default useFetchVideo;
