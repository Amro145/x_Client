import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PostDetails from "../Home/post/PostDetails";
import EditProfile from "./EditProfile";
import { useDispatch, useSelector } from "react-redux";
import { getUserPosts, getLikedPosts } from "../../../store/api/postApi";
import { editProfile, ProfileFn } from "../../../store/api/userApi";
import { timeSince } from "../../../lib/date";
import { getFollowers, getFollowing } from "../../../store/api/authApi";
import RightBarButton from "../Home/Rightpar/RightBarButton";
import FollowUnfollow from "./FollowUnfollow";
import Swal from "sweetalert2";

function Profile() {
  const { myProfile, profileLoading, error, userData } = useSelector((state) => state.auth);
  const { postLoading, userPostsList, likedPostsList } = useSelector((state) => state.post);

  const [isMyProfile, setIsMyProfile] = useState(false);
  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [tab, setTab] = useState("posts");

  const coverPicRef = useRef(null);
  const profilePicRef = useRef(null);

  const params = useParams();
  const dispatch = useDispatch();

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          text: "Image size must be less than 5MB!",
          icon: "error",
          timer: 2000,
          showConfirmButton: false,
        });
        e.target.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        if (state === "coverPic") setCoverPic(reader.result);
        if (state === "profilePic") setProfilePic(reader.result);
        dispatch(editProfile({ [state]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (params.id) {
      dispatch(ProfileFn(params.id));
      if (tab === "posts") {
        dispatch(getUserPosts({ id: params.id, page: 1 }));
      } else {
        dispatch(getLikedPosts({ page: 1 }));
      }
    }
  }, [dispatch, params.id, tab]);

  useEffect(() => {
    if (!profileLoading && userData?._id && params.id) {
      setIsMyProfile(params.id === userData?._id);
    }
  }, [profileLoading, userData, params.id]);

  const displayPosts = tab === "posts" ? userPostsList : likedPostsList;

  if (profileLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      {!profileLoading && myProfile ? (
        <div className="min-h-screen">
          <div className="header flex justify-start gap-6 px-4 py-2 items-center sticky top-0 bg-black/80 backdrop-blur-md z-20 border-b border-gray-800">
            <Link to="/" className="flex items-center gap-4 hover:bg-gray-900/50 p-2 rounded-full transition-colors">
              <FaArrowLeft className="w-5 h-5 text-white" />
              <div className="info flex flex-col">
                <span className="font-bold text-xl text-white">
                  {myProfile?.userName}
                </span>
                <span className="text-sm text-gray-500">{tab === "posts" ? userPostsList?.length : likedPostsList?.length} {tab}</span>
              </div>
            </Link>
          </div>
          {error && <div className="text-red-500 text-center p-2 bg-red-500/10">{error}</div>}

          {/* COVER IMG */}
          <div className="relative group/cover">
            <img
              src={coverPic || myProfile?.coverPic || "/cover.png"}
              className="h-[200px] w-full object-cover"
              alt="cover image"
            />
            <input
              type="file"
              hidden
              ref={coverPicRef}
              onChange={(e) => handleImgChange(e, "coverPic")}
            />
            <input
              type="file"
              hidden
              ref={profilePicRef}
              onChange={(e) => handleImgChange(e, "profilePic")}
            />
            {/* USER AVATAR */}
            <div className="avatar absolute -bottom-16 left-4">
              <div className="w-32 h-32 rounded-full relative group/avatar border-4 border-black overflow-hidden bg-black">
                <img
                  src={
                    profilePic ||
                    myProfile?.profilePic ||
                    "/avatar-placeholder.png"
                  }
                  className="w-full h-full object-cover"
                  alt="avatar"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer">
                  {isMyProfile && (
                    <MdEdit
                      className="w-8 h-8 text-white"
                      onClick={() => profilePicRef.current.click()}
                    />
                  )}
                </div>
              </div>
            </div>
            {isMyProfile && (
              <div
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity cursor-pointer"
                onClick={() => coverPicRef.current.click()}
              >
                <MdEdit className="w-8 h-8 text-white" />
              </div>
            )}
          </div>

          <div className="user info">
            <div className="info mt-[70px] flex flex-col px-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-2xl text-white">{myProfile?.userName}</span>
                  <span className="text-sm text-gray-500">@{myProfile?.email}</span>
                </div>
              </div>
              <p className="text-white mt-4 text-[15px]">
                {myProfile?.bio || "No bio yet."}
              </p>
              <div className="links flex flex-wrap items-center gap-4 mt-4 text-gray-500">
                {myProfile?.link && (
                  <div className="link flex items-center gap-1">
                    <FaLink className="w-3 h-3" />
                    <a
                      className="text-blue-500 hover:underline text-sm truncate max-w-[200px]"
                      href={myProfile.link.startsWith('http') ? myProfile.link : `https://${myProfile.link}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {myProfile.link}
                    </a>
                  </div>
                )}
                <div className="date flex items-center gap-1">
                  <IoCalendarOutline className="w-4 h-4" />
                  <span className="text-sm">Joined {timeSince(myProfile?.createdAt)}</span>
                </div>
              </div>
              <div className="follow mt-4 flex gap-4">
                <Link
                  to={`/profile/followers/${myProfile?._id}`}
                  className="text-white hover:underline flex gap-1 items-center"
                >
                  <span className="font-bold">{myProfile?.followers?.length || 0}</span>
                  <span className="text-gray-500 text-sm">Followers</span>
                </Link>
                <Link
                  to={`/profile/following/${myProfile?._id}`}
                  className="text-white hover:underline flex gap-1 items-center"
                >
                  <span className="font-bold">{myProfile?.following?.length || 0}</span>
                  <span className="text-gray-500 text-sm">Following</span>
                </Link>
              </div>
            </div>
            <div className="px-4 mt-4">
              {isMyProfile ? (
                <EditProfile />
              ) : (
                <FollowUnfollow id={params.id} status={userData?.following?.includes(myProfile?._id)} />
              )}
            </div>
          </div>

          <div className="posts mt-8">
            <div className="head sticky top-[53px] bg-black/80 backdrop-blur-md z-10 border-b border-gray-800">
              <div className="flex justify-around">
                <button
                  onClick={() => setTab("posts")}
                  className="cursor-pointer hover:bg-gray-900/50 transition duration-200 w-full flex justify-center items-center relative py-4"
                >
                  <div className={`font-bold ${tab === "posts" ? "text-white" : "text-gray-500"}`}>Posts</div>
                  {tab === "posts" && (
                    <div className="absolute bottom-0 w-14 h-1 rounded-full bg-blue-500"></div>
                  )}
                </button>
                <button
                  onClick={() => setTab("likes")}
                  className="cursor-pointer hover:bg-gray-900/50 transition duration-200 w-full flex justify-center items-center relative py-4"
                >
                  <div className={`font-bold ${tab === "likes" ? "text-white" : "text-gray-500"}`}>Likes</div>
                  {tab === "likes" && (
                    <div className="absolute bottom-0 w-14 h-1 rounded-full bg-blue-500"></div>
                  )}
                </button>
              </div>
            </div>
            <div className="post-list">
              {postLoading && (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                </div>
              )}
              {!postLoading && displayPosts?.length === 0 && (
                <p className="text-center my-10 text-gray-500">
                  No {tab} to show yet 👻
                </p>
              )}
              {!postLoading &&
                displayPosts?.length > 0 &&
                displayPosts.map((post) => (
                  <PostDetails key={post._id} onePost={post} />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen text-gray-500 font-bold">User Not Found</div>
      )}
    </>
  );
}

export default Profile;
