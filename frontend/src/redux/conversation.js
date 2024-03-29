import { createSlice } from "@reduxjs/toolkit";

const conversationSlice = createSlice({
  name: "conversation",
  initialState: {
    getConversation: [],
    getSelectedConversation: {
      _id: "",
      userId: "",
      userName: "",
      userProfilePic: "",
      mock: "",
    },
  },
  reducers: {
    setConversation: (state, action) => {
      state.getConversation = action.payload;
    },
    setSelectedConversation: (state, action) => {
      state.getSelectedConversation = action.payload;
    },
  },
});

export const { setConversation, setSelectedConversation } =
  conversationSlice.actions;
export default conversationSlice.reducer;
