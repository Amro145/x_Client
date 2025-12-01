import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function FollowUnfollow({ id, status }) {
  const { userData, loading } = useSelector(
    (state) => state.auth
  );

  const [isFollow, setIsFollow] = useState(status);
  const [followLoading, setFollowLoading] = useState(false)

  const handleFollowUnfollow = async (userId) => {
    try {
      setFollowLoading(true)
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/follow/${id}`, {}, { withCredentials: true })
      console.log(res.data?.isFollowing)
      setIsFollow(res.data?.isFollowing)
      setFollowLoading(false)
    } catch (error) {
      console.log(error)

    }

  }


  return (
    <button
      className="btn outline bg-transparent hover:bg-white hover:opacity-90 rounded  px-5 relative left-10 mt-5 mb-10 "
      onClick={(e) => {
        e.preventDefault();
        handleFollowUnfollow(id);
      }}

    >
      {followLoading || loading
        ? "loading"
        : userData && isFollow !== null &&
        (isFollow ? "unFollow" : "Follow")}
    </button>
  );

};

export default FollowUnfollow;
