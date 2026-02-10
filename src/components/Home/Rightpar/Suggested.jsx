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

function Suggested() {
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
        <div className="w-full min-h-screen">
            <div className="header flex items-center gap-6 px-4 py-3 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800">
                <Link to="/" className="hover:bg-gray-900 rounded-full p-2 transition-colors">
                    <BiSolidLeftArrowCircle size={24} className="text-white" />
                </Link>
                <h1 className="text-xl font-bold text-white">Who to follow</h1>
            </div>

            <div className="p-4">
                {suggestedLoading ? (
                    <RightBarSkeleton />
                ) : suggestedUserList?.length !== 0 ? (
                    <div className="flex flex-col gap-4">
                        {suggestedUserList?.map((user) => (
                            <div className="flex justify-between items-center" key={user?._id}>
                                <Link
                                    to={`/profile/${user?._id}`}
                                    onClick={() => handleProfileClick(user?._id)}
                                    className="flex items-center gap-3 flex-1"
                                >
                                    <div className="avatar">
                                        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-800">
                                            <img src={user?.profilePic || "/avatar-placeholder.png"} className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                    <div className="text flex flex-col">
                                        <span className="font-bold hover:underline text-white">{user?.userName}</span>
                                        <span className="text-gray-500 text-sm">
                                            @{user?.userName}
                                        </span>
                                    </div>
                                </Link>
                                <FollowUnfollow id={user?._id} status={false} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500 mt-10">No suggestions available</p>
                )}
            </div>
        </div>
    );
}

export default Suggested;
