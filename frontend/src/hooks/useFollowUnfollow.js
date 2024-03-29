import { useState } from "react";
import useShowToast from "./useShowToast";
import { useSelector } from "react-redux";
import useLoading from "./useLoading";
import axios from "axios";

const useFollowUnfollow = (user) => {
  const currentUser = useSelector((state) => state.user.userInfo);

  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const { isLoading, setLoading } = useLoading();

  const showToast = useShowToast();

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if (isLoading) return;

    setLoading(true);
    try {
      await axios.post(`/api/users/follow/${user._id}`);

      if (following) {
        showToast("Success", `Unfollowed ${user.name}`, "success");
        user.followers.pop(); // simulate removing from followers
      } else {
        showToast("Success", `Followed ${user.name}`, "success");
        user.followers.push(currentUser?._id); // simulate adding to followers
      }
      setFollowing(!following);
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
    } finally {
      setLoading(false);
    }
  };

  return { handleFollowUnfollow, isLoading, following };
};

export default useFollowUnfollow;
