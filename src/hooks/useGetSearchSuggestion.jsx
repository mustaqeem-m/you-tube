import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cacheResults } from './../utils/slices/searchSlice';

const useGetSearchSuggestion = (searchQuery) => {
  const [suggestions, setSuggestions] = useState([]);
  const searchCache = useSelector((store) => store.search.searchResults);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else if (searchQuery) {
        getSuggestions();
      } else {
        setSuggestions([]);
      }
    }, 500);

    const getSuggestions = async () => {
      try {
        const data = await fetch(
          `/api/complete/search?client=firefox&ds=yt&q=${searchQuery}`
        );
        const json = await data.json();
        dispatch(cacheResults({ [searchQuery]: json[1] }));
        setSuggestions(json[1]);
      } catch (error) {
        console.log('Failed to fetch suggestions', error);
      }
    };

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery, searchCache, dispatch]);

  return suggestions;
};

export default useGetSearchSuggestion;
