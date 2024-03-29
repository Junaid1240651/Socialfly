import io from "socket.io-client";
import { setOnlineUsers, setSocket } from "../redux/socketio";

const setupSocket = (userId, dispatch) => {
  const socket = io("/", {
    query: {
      userId: userId,
    },
  });

  socket.on("getOnlineUsers", (users) => {
    dispatch(setOnlineUsers(users));
  });

  return socket;
};

export default setupSocket;
