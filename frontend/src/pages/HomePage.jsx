import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useEffect } from "react";
import useShowToast from "../hooks/useShowToast";
import axios from "axios";
import useLoading from "../hooks/useLoading";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/posts";
import Post from "../components/Post";
import SuggestedUsers from "../components/SuggestedUsers";

const HomePage = () => {
  const showToast = useShowToast();
  const { isLoading, setLoading } = useLoading();
  const posts = useSelector((state) => state.posts.setPosts);
  const dispatch = useDispatch();

  const getFeedPost = async () => {
    if (isLoading) return;
    setLoading(true);
    try {
      const response = await axios.get("/api/posts/feed");
      dispatch(setPosts(response.data));
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getFeedPost();
  }, []);

  return (
    <Flex gap="10" alignItems={"flex-start"}>
      <Box flex={70}>
        {!isLoading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}

        {isLoading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}
        {!isLoading &&
          posts.map((post) => (
            <Post key={post._id} post={post} postedBy={post.postedBy} />
          ))}
      </Box>
      <Box
        flex={30}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <SuggestedUsers />
      </Box>
    </Flex>
  );
};

export default HomePage;
