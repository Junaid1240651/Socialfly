import { Suspense, lazy } from "react";
import { Box, Container } from "@chakra-ui/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import setupSocket from "./socketio/socketio.js";
import { setSocket } from "./redux/socketio";
import Header from "./components/Header";
import CreatePost from "./components/CreatePost";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

const HomePage = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const UpdateProfilePage = lazy(() => import("./pages/UpdateProfilePage"));
const UserPage = lazy(() => import("./pages/UserPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const ChatPage = lazy(() => import("./pages/ChatPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));

const App = () => {
  const user = useSelector((state) => state.user.userInfo);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = user ? setupSocket(user._id, dispatch) : null;
    if (socket) {
      dispatch(setSocket(socket));
      return () => {
        socket.close();
      };
    }
  }, [user?._id, dispatch]);

  return (
    <Box position={"relative"} w="full">
      <Container
        maxW={pathname === "/" ? { base: "620px", md: "900px" } : "620px"}
      >
        <Header />
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to="/auth" />}
            />
            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={user ? <UpdateProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/:userName"
              element={
                user ? (
                  <>
                    <UserPage />
                    <CreatePost />
                  </>
                ) : (
                  <UserPage />
                )
              }
            />
            <Route path="/:userName/post/:id" element={<PostPage />} />
            <Route
              path="/chat"
              element={user ? <ChatPage /> : <Navigate to={"/auth"} />}
            />
            <Route
              path="/settings"
              element={user ? <SettingsPage /> : <Navigate to={"/auth"} />}
            />
          </Routes>
        </Suspense>
      </Container>
    </Box>
  );
};

export default App;
