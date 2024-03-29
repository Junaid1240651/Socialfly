import { useEffect, useState } from "react";
import axios from "axios";
import useShowToast from "./useShowToast";
import useLoading from "./useLoading";
import { useParams } from "react-router-dom";

const useGetUserProfile = () => {
  const { isLoading, setLoading } = useLoading();
  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const showToast = useShowToast();
  const getUser = async () => {
    try {
      const user = await axios.get(`/api/users/profile/${userName}`);
      if (user.data.isFrozen) {
        setUser(null);
        return;
      }
      setUser(user.data);
    } catch (error) {
      showToast("Error", error.response.data.error, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);
    getUser();
  }, [userName]);
  return { user, isLoading };
};

export default useGetUserProfile;
