import React from 'react';
import Buttons from '@/components/Buttons';

const ButtonList = () => {
  const btns = [
    'All',
    'Cricket',
    'Live',
    'Serial',
    'Movies',
    'Fiction',
    'Drama',
    'Gaming',
    'Trending',
    'News',
    'Comedy',
    'Tamil',
    'Music',
    'Sports',
    'Tech',
    'Lifestyle',
  ];

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap no-scrollbar">
      {btns.map((b, i) => (
        <Buttons key={i} name={b} />
      ))}
    </div>
  );
};

export default ButtonList;
