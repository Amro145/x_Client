import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  ProfileFn,
  suggestedUser,
} from "../../../../store (3)/api/userApi";
import { getUserPosts } from "../../../../store (3)/api/postApi";
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
          suggestedUserList?.map((user) => {
            return (
              <div className="flex w-full px-1 justify-start items-center gap-2 " key={user?._id}>
                <Link
                  to={`/profile/${user?._id}`}
                  onClick={() => {
                    handleProfileClick(user?._id);
                  }}
                >
                  <div className="user flex py-2 items-center gap-2">
                    <div className="avatar">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img src={user?.profileImg || "/avatar-placeholder.png"} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <div className="text grid">
                      <span className="font-bold hover:underline">{user?.userName}</span>
                      <span className="text-gray-500 text-sm">
                        @{user?.userName}
                      </span>
                    </div>
                  </div>
                </Link>
             <FollowUnfollow id={user?._id} status={false} />
              </div>
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}

export default Rightbar;
