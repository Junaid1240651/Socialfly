import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authentication",
  initialState: {
    authScreenStatus: "Login",
  },
  reducers: {
    setAuthScreenStatus: (state, action) => {
      state.authScreenStatus = action.payload;
    },
  },
});

export const { setAuthScreenStatus } = authSlice.actions;
export default authSlice.reducer;
