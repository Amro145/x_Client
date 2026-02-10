import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUnFollow } from "../../../store/api/userApi";

function FollowUnfollow({ id }) {
  const { userData, followLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isFollowing = userData?.following?.includes(id);

  const handleFollowUnfollow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(followUnFollow(id));
  };

  if (!userData || userData._id === id) return null;

  return (
    <button
      className={`btn btn-sm rounded-full px-6 transition-all duration-200 border-none font-bold ${isFollowing
          ? "bg-transparent border border-gray-600 text-white hover:border-red-500 hover:text-red-500 hover:bg-red-500/10"
          : "bg-white text-black hover:bg-gray-200"
        }`}
      onClick={handleFollowUnfollow}
      disabled={followLoading}
    >
      {followLoading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : isFollowing ? (
        <span className="group">
          <span className="group-hover:hidden">Following</span>
          <span className="hidden group-hover:inline">Unfollow</span>
        </span>
      ) : (
        "Follow"
      )}
    </button>
  );
}

export default FollowUnfollow;
