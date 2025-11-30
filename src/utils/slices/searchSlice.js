import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: {},
  },
  reducers: {
    cacheResults: (state, action) => {
      state.searchResults = { ...state.searchResults, ...action.payload };
    },
  },
});

export const { cacheResults } = searchSlice.actions;
export default searchSlice.reducer;
