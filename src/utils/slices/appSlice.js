import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleIsMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});

export default appSlice.reducer;
export const { toggleIsMenu } = appSlice.actions;
