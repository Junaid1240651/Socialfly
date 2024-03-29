import io from "socket.io-client";
import { setOnlineUsers, setSocket } from "../redux/socketio";

const setupSocket = (userId, dispatch) => {
  const socket = io("http://localhost:3000/", {
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
