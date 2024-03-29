import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import userInfoReducer from "./user";
import postsReducer from "./posts";
import socketioReducer from "./socketio";
import conversationReducer from "./conversation";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["posts", "conversation", "socketio"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userInfoReducer,
  posts: postsReducer,
  conversation: conversationReducer,
  socketio: socketioReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
