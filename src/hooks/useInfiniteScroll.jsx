import { useEffect, useState } from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.innerHeight + document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.offsetHeight;

      // console.log(
      //   `Position: ${Math.round(scrollPosition)}, Height: ${scrollHeight}`
      // );

      // ✅ Only trigger when AT (or very close to) bottom AND not already fetching
      if (scrollPosition < scrollHeight - 5 || isFetching) return;
      // still not at bottom  → do nothing

      setIsFetching(true);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching]); // isFetching used inside handleScroll

  useEffect(() => {
    if (!isFetching) return;
    callback(); // parent will fetch more data
  }, [isFetching, callback]);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
