import React, { useEffect, useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { toggleIsMenu } from '@/utils/slices/appSlice';
import axios from 'axios';
import useGetSearchSuggestion from '@/hooks/useGetSearchSuggestion';

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const suggestions = useGetSearchSuggestion(searchQuery);

  const handleSuggestionClick = (suggestion) => {
    console.log('handleSuggestionClick');
    setSearchQuery(suggestion);
    setShowSuggestion(false);
  };

  const handleToggleMenu = () => {
    dispatch(toggleIsMenu());
  };

  return (
    <header className="grid grid-flow-col w-full items-center justify-between px-6 py-1 bg-white shadow-md">
      {/* LEFT: Sidebar/Menu icon */}
      <div className="flex items-center gap-3">
        <Menu className="w-6 h-6 cursor-pointer" onClick={handleToggleMenu} />
        <img
          src="/images.png"
          alt="YouTube"
          className="h-5 ml-5 w-auto block cursor-pointer"
        />
      </div>

      {/* CENTER: Search bar */}
      <div className="relative">
        <div className="flex items-center bg-white rounded-full px-3 py-1 min-w-[650px]">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded-l-full px-4 py-1 flex-grow focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => setTimeout(() => setShowSuggestion(false), 100)}
          />
          <button className="border border-gray-300 px-4 py-1 rounded-r-full">
            <Search />
          </button>
        </div>
        {showSuggestion && suggestions.length > 0 && (
          <div className="z-10 absolute top-full left-0 w-full bg-white border border-gray-600 rounded-lg mt-1">
            <ul>
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* RIGHT: Profile / User icon */}
      <div className="col-span-1">
        <img
          alt="usr-logo"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7U_ef87Q7CQ1Fx_khkPq-y9IfPmBWrMZ6ig&s"
          className="w-10 h-10 rounded-full border cursor-pointer"
        />
      </div>
    </header>
  );
};

export default Head;
