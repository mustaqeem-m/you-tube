import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, ThumbsUp, MessageCircle, MonitorPlay } from 'lucide-react';
import axios from 'axios';

const WatchPage = () => {
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchParams] = useSearchParams();
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const videoId = searchParams.get('v');
  const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

  const relativeVideoFetcher = async (videoTitle) => {
    if (!videoId || !GOOGLE_API_KEY) return;
    try {
      const BASE_URL_RELVID = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${videoTitle}&type=video&key=${GOOGLE_API_KEY}`;
      const response = await axios.get(BASE_URL_RELVID);
      console.log(response);
      if (response) {
        setRelatedVideos(response.data.items);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const videoCommentsFetcher = async (videoId) => {
    try {
      const BASE_URL_COMMENT = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${GOOGLE_API_KEY}`;
      const response = await axios.get(BASE_URL_COMMENT);
      setComments(response.data.items);
      console.log(response.data.items);
    } catch (err) {
      console.log(err);
    }
  };

  const videoDetailsFetcher = async () => {
    if (!videoId || !GOOGLE_API_KEY) return;
    try {
      setLoading(true);
      setError('');
      const BASE_URL = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${GOOGLE_API_KEY}`;
      const response = await axios.get(BASE_URL);
      const item = response.data.items?.[0];
      setVideoDetails(item || null);
      if (item) {
        relativeVideoFetcher(item.snippet.title);
        videoCommentsFetcher(item.id);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong while loading the video.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    videoDetailsFetcher();
  }, [videoId]);

  const thumbnail =
    videoDetails?.snippet?.thumbnails?.maxres?.url ||
    videoDetails?.snippet?.thumbnails?.high?.url ||
    videoDetails?.snippet?.thumbnails?.medium?.url ||
    videoDetails?.snippet?.thumbnails?.default?.url;

  return (
    <div className="flex min-h-screen w-full bg-zinc-950 text-zinc-50 px-6 py-5 gap-6">
      {/* Left column */}
      <div className="flex flex-col w-full lg:w-[68%] gap-4">
        {/* Video */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-zinc-900 shadow-lg shadow-black/50 border border-zinc-800">
          <div className="relative w-full pt-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full rounded-2xl"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Loading / Error / Details */}
        {loading && (
          <div className="animate-pulse rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 space-y-3">
            <div className="h-6 w-3/4 bg-zinc-800 rounded"></div>
            <div className="h-4 w-1/3 bg-zinc-800 rounded"></div>
            <div className="flex gap-3 mt-2">
              <div className="h-10 w-24 bg-zinc-800 rounded-full"></div>
              <div className="h-10 w-24 bg-zinc-800 rounded-full"></div>
              <div className="h-10 w-24 bg-zinc-800 rounded-full"></div>
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="rounded-2xl bg-red-900/30 border border-red-500/60 p-4 text-sm text-red-200">
            {error}
          </div>
        )}

        {!loading && !error && videoDetails && (
          <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 md:p-5 space-y-4 shadow-lg shadow-black/40">
            {/* Title */}
            <h1 className="text-lg md:text-xl font-semibold leading-snug tracking-tight">
              {videoDetails.snippet?.title}
            </h1>
            {/* Channel + Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 via-fuchsia-500 to-amber-400 flex items-center justify-center text-xs font-semibold">
                  {videoDetails.snippet?.channelTitle?.[0] || 'C'}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">
                    {videoDetails.snippet?.channelTitle}
                  </span>
                  <span className="text-xs text-zinc-400">
                    Official Channel
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button className="px-4 py-2 rounded-full bg-zinc-100 text-zinc-950 text-sm font-semibold hover:bg-white transition">
                  Subscribe
                </button>
                <button className="px-4 py-2 rounded-full bg-zinc-800 text-sm hover:bg-zinc-700 flex items-center gap-2">
                  <MonitorPlay className="w-4 h-4" />
                  Save to Watchlist
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 px-3 py-2">
                <Eye className="w-4 h-4 text-zinc-300" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-zinc-400">Views</span>
                  <span className="text-sm font-semibold">
                    {Number(
                      videoDetails.statistics?.viewCount || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 px-3 py-2">
                <ThumbsUp className="w-4 h-4 text-zinc-300" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-zinc-400">Likes</span>
                  <span className="text-sm font-semibold">
                    {Number(
                      videoDetails.statistics?.likeCount || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 px-3 py-2">
                <MessageCircle className="w-4 h-4 text-zinc-300" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-zinc-400">Comments</span>
                  <span className="text-sm font-semibold">
                    {Number(
                      videoDetails.statistics?.commentCount || 0
                    ).toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-zinc-900 border border-zinc-800 px-3 py-2">
                <div className="w-4 h-4 rounded-full border border-zinc-400" />
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-zinc-400">Duration</span>
                  <span className="text-sm font-semibold">
                    {videoDetails.contentDetails?.duration}
                  </span>
                </div>
              </div>
            </div>
            {/* Description */}
            {videoDetails.snippet?.description && (
              <div className="mt-3 rounded-2xl bg-zinc-950/60 border border-zinc-900 px-4 py-3 max-h-40 overflow-y-auto text-xs md:text-sm text-zinc-300 whitespace-pre-line">
                {videoDetails.snippet.description}
              </div>
            )}
            {/* Comment Section */}
            {comments && (
              <div className="mt-6 space-y-5">
                <h2 className="text-lg font-semibold mb-2">Comments</h2>

                {comments.map((comment) => {
                  const top = comment.snippet.topLevelComment.snippet;

                  return (
                    <div
                      key={comment.id}
                      className="flex gap-4 rounded-xl bg-zinc-900/60 p-4 border border-zinc-800 hover:bg-zinc-900 transition"
                    >
                      {/* Author Avatar */}
                      <img
                        src={top.authorProfileImageUrl}
                        alt={top.authorDisplayName}
                        className="w-10 h-10 rounded-full shadow-sm"
                      />

                      {/* Comment Body */}
                      <div className="flex flex-col w-full gap-1">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">
                            {top.authorDisplayName}
                          </span>
                          <span className="text-xs text-zinc-400">
                            {new Date(top.publishedAt).toLocaleDateString()}
                          </span>
                        </div>

                        <p
                          className="text-sm text-zinc-300 leading-snug"
                          dangerouslySetInnerHTML={{ __html: top.textDisplay }}
                        ></p>

                        {/* Likes Row */}
                        <div className="flex items-center gap-3 mt-1 text-xs text-zinc-400">
                          <button className="hover:text-zinc-200 transition">
                            👍 {top.likeCount}
                          </button>
                          <button className="hover:text-zinc-200 transition">
                            💬 Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right column – placeholder for recommendations / chat / etc. */}
      <div className="hidden lg:flex w-[32%] flex-col gap-3">
        <div className="rounded-2xl bg-zinc-900/80 border border-zinc-800 p-4 shadow-lg shadow-black/40">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold tracking-tight">Up next</h2>
            <span className="text-[11px] text-zinc-400 uppercase tracking-wide">
              Auto-play
            </span>
          </div>
          <p className="text-xs text-zinc-400">
            {relatedVideos?.map((vid) => {
              const thumbnail = vid.snippet?.thumbnails?.high?.url;

              return (
                <Link
                  key={vid.id.videoId}
                  to={`/watch?v=${vid.id.videoId}`}
                  className="group flex gap-3 w-full rounded-xl p-2 hover:bg-zinc-900/70 transition cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-40 h-24 overflow-hidden rounded-lg bg-zinc-800">
                    <img
                      src={thumbnail}
                      alt={vid.snippet.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Text */}
                  <div className="flex flex-col justify-between flex-1">
                    <h3 className="text-sm font-medium line-clamp-2 group-hover:text-zinc-100">
                      {vid.snippet.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-semibold group-hover:text-zinc-300">
                      {vid.snippet.channelTitle}
                    </p>
                  </div>
                </Link>
              );
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
