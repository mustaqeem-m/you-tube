import { Flame, Home } from 'lucide-react';

const YOUTUBE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
if (!YOUTUBE_API_KEY) {
  throw new Error(
    'VITE_GOOGLE_API_KEY is not defined. Please check your .env file.'
  );
}

export const YOUTUBE_VIDEO_API = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=VIDEOID&key=${YOUTUBE_API_KEY}`;

import {
  ShoppingBag,
  Music,
  Radio,
  Film,
  Gamepad2,
  BookOpen,
  Tv,
} from 'lucide-react';

export const mainLinks = [
  { name: 'Home', icon: Home },
  { name: 'Trending', icon: Flame },
  { name: 'Shopping', icon: ShoppingBag },
  { name: 'Music', icon: Music },
  { name: 'Live', icon: Radio },
  { name: 'Movies', icon: Film },
  { name: 'Gaming', icon: Gamepad2 },
  { name: 'Learning', icon: BookOpen },
  { name: 'TV Shows', icon: Tv },
];

export const exploreLinks = [
  { name: 'All' },
  { name: 'Trending' },
  { name: 'Music' },
  { name: 'Movies' },
  { name: 'Live' },
  { name: 'Gaming' },
  { name: 'News' },
  { name: 'Sports' },
  { name: 'Learning' },
  { name: 'Science & Tech' },
  { name: 'Fashion & Beauty' },
  { name: 'Shopping' },
  { name: 'Travel' },
  { name: 'Comedy' },
  { name: 'Podcasts' },
  { name: 'Documentaries' },
  { name: 'Food & Cooking' },
  { name: 'Health & Fitness' },
  { name: 'DIY' },
  { name: 'Photography' },
  { name: 'Animation' },
  { name: 'History' },
  { name: 'Motivation' },
  { name: 'Finance' },
  { name: 'Cars' },
  { name: 'Pets' },
  { name: 'Nature' },
];
