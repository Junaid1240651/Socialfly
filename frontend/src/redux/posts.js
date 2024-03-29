import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    setPosts: [],
  },
  reducers: {
    setPosts: (state, action) => {
      state.setPosts = action.payload;
    },
  },
});

export const { setPosts } = postsSlice.actions; // Corrected action creator name
export default postsSlice.reducer;
