import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ProfileFn,
  suggestedUser,
} from "../../../../store/api/userApi";
import { getUserPosts } from "../../../../store/api/postApi";
import RightBarSkeleton from "../../skeleton/RightBarSkeleton";
import RightBarButton from "./RightBarButton";
import FollowUnfollow from "../../profile/FollowUnfollow";

function Rightbar() {
  const { suggestedUserList, suggestedLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(suggestedUser());
  }, [dispatch]);
  const handleProfileClick = (userId) => {
    dispatch(ProfileFn(userId));
    dispatch(getUserPosts(userId));
  };

  return (
    <div className="hidden md:block  my-4 w-full h-screen overflow-y-auto px-4">
      <div className="">
        <h2 className="text-xl font-bold mb-4 px-2">Who to follow</h2>
        {suggestedLoading ? (
          <RightBarSkeleton />
        ) : suggestedUserList?.length !== 0 ? (
          <div className="flex flex-col gap-3">
            {suggestedUserList?.map((user) => (
              <div className="flex w-full items-center justify-between hover:bg-gray-900/40 p-2 rounded-xl transition-colors duration-200" key={user?._id}>
                <Link
                  to={`/profile/${user?._id}`}
                  className="flex items-center gap-3 flex-1 min-w-0"
                >
                  <div className="avatar shrink-0">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-800">
                      <img src={user?.profilePic || "/avatar-placeholder.png"} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="text flex flex-col min-w-0">
                    <span className="font-bold hover:underline truncate text-white">{user?.userName}</span>
                    <span className="text-gray-500 text-sm truncate">
                      @{user?.userName}
                    </span>
                  </div>
                </Link>
                <FollowUnfollow id={user?._id} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm px-2">No suggestions available.</p>
        )}
      </div>
    </div>
  );
}

export default Rightbar;
