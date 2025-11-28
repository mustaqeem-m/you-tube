import { useEffect, useState } from 'react';

const useGetSearchSuggestion = (searchQuery) => {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
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
        setSuggestions(json[1]);
      } catch (error) {
        console.log('Failed to fetch suggestions', error);
      }
    };

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  return suggestions;
};

export default useGetSearchSuggestion;
