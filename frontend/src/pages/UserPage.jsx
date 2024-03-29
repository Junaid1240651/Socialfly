import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import useShowToast from "../hooks/useShowToast";
import { Flex, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../redux/posts";
import Post from "../components/Post";
import useGetUserProfile from "../hooks/useGetUserProfile";

const UserPage = () => {
  const [fetchingPosts, setFetchingPosts] = useState(true);

  const posts = useSelector((state) => state.posts.setPosts);
  const dispatch = useDispatch();
  const { user, isLoading } = useGetUserProfile();
  const { userName } = useParams();
  const showToast = useShowToast();

  const getPosts = async () => {
    if (!user) return;
    setFetchingPosts(true);
    try {
      const post = await axios.get(`/api/posts/user/${userName}`);
      dispatch(setPosts(post.data));
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
      dispatch(setPosts([]));
    } finally {
      setFetchingPosts(false);
    }
  };
  useEffect(() => {
    getPosts();
  }, [userName, user]);

  if (!user && isLoading) {
    return (
      <Flex justifyContent={"center"}>
        <Spinner size={"xl"} />
      </Flex>
    );
  }
  if (!user && !isLoading) {
    return <h1>User Not Found</h1>;
  }
  return (
    <>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has not posts.</h1>}
      {fetchingPosts && (
        <Flex justifyContent={"center"} my={12}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!fetchingPosts &&
        posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
    </>
  );
};

export default UserPage;
