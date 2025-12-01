import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { IoCalendarOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import PostDetails from "../Home/post/PostDetails";
import EditProfile from "./EditProfile";
import FollowUnfollow from "./FollowUnfollow";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../store (3)/api/postApi";
import { editProfile, ProfileFn } from "../../../store (3)/api/userApi";
import { timeSince } from "../../../lib/date";
import { getFollowers, getFollowing } from "../../../store (3)/api/authApi";
import Navbar2 from "../Home/Navbar2";

function Profile() {
  const { myProfile, profileLoading, error } = useSelector((state) => state.auth);
  const { userData } = useSelector((state) => state.auth);
  const { postLoading, allPostList } = useSelector((state) => state.post);
  const [isMyProfile, setIsMyProfile] = useState(false);
  const [coverPic, setcoverPic] = useState(null);
  const [profilePic, setprofilePic] = useState(null);
  const [type, setType] = useState("Posts");
  const coverPicRef = useRef(null);
  const profilePicRef = useRef(null);
  const params = useParams();
  const dispatch = useDispatch();

  const handleImgChange = (e, state) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        state === "coverPic" && setcoverPic(reader.result);
        state === "profilePic" && setprofilePic(reader.result);
        dispatch(editProfile({ [state]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    dispatch(ProfileFn(params.id));
  }, [dispatch, params.id]);
  useEffect(() => {
    if (!profileLoading && myProfile?._id !== undefined) dispatch(getAllPosts());
  }, [dispatch, myProfile, profileLoading]);

  const filtered = allPostList.filter((item) => item.user?._id === params.id);
  useEffect(() => {
    if (!profileLoading) {
      setIsMyProfile(params.id === userData?._id);
    }
  }, [profileLoading, userData, params.id]);

  return (
    <>
      {profileLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      {!profileLoading && myProfile ? (
        <>
          <div className="header flex justify-start gap-6 px-4 py-2 items-center sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800">
            <Link to="/" className="flex items-center gap-4 hover:bg-gray-900/50 p-2 rounded-full transition-colors">
              <FaArrowLeft className="w-5 h-5 text-white" />
              <div className="info flex flex-col">
                <span className="font-bold text-xl text-white">
                  {myProfile?.userName}
                </span>
                <span className="text-sm text-gray-500">{filtered?.length || 0} posts</span>
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
              <div className="w-32 h-32 rounded-full relative group/avatar border-4 border-black overflow-hidden">
                <img
                  src={
                    profilePic ||
                    myProfile?.profilePic ||
                    "/avatar-placeholder.png"
                  }
                  className="w-full h-full object-cover"
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
          </div>

          <div className="user info">
            <div className="info mt-[70px] flex flex-col px-4">
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-xl text-white">{myProfile?.userName}</span>
                  <span className="text-sm text-gray-500">@{myProfile?.email}</span>
                </div>
              </div>
              <p className="text-white mt-4">
                {myProfile?.bio ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
              </p>
              <div className="links flex items-center gap-4 mt-4 text-gray-500">
                <div className="link flex items-center gap-1">
                  <FaLink className="w-4 h-4" />
                  <a
                    className="text-blue-500 hover:underline text-sm truncate max-w-[200px]"
                    href={`${window.location.origin}/profile/${myProfile?._id}`}
                  >
                    {`profile/${myProfile?._id}`}
                  </a>
                </div>
                <div className="date flex items-center gap-1">
                  <IoCalendarOutline className="w-4 h-4" />
                  <span className="text-sm">Joined {timeSince(myProfile?.createdAt)}</span>
                </div>
              </div>
              <div className="follow mt-4 flex gap-4">
                <Link
                  to={`/profile/followers/${myProfile?._id}`}
                  className="text-white hover:underline flex gap-1 items-center"
                  onClick={() => {
                    dispatch(getFollowing(myProfile?._id));
                  }}
                >
                  <span className="font-bold">{myProfile?.followers?.length}</span>
                  <span className="text-gray-500">followers</span>
                </Link>
                <Link
                  to={`/profile/following/${myProfile?._id}`}
                  className="text-white hover:underline flex gap-1 items-center"
                  onClick={() => {
                    dispatch(getFollowers(myProfile?._id));
                  }}
                >
                  <span className="font-bold">{myProfile?.following?.length}</span>
                  <span className="text-gray-500">following</span>
                </Link>
              </div>
            </div>
            {isMyProfile ? (
              <EditProfile />
            ) : (
              <FollowUnfollow user={myProfile} />
            )}
          </div>
          <div className="posts mt-10">
            <div className="head mt-4">
              <div className="relative border-b border-gray-800 flex justify-around text-center">
                <button
                  onClick={() => setType("forYou")}
                  className="cursor-pointer hover:bg-gray-900/50 transition duration-200 w-full flex justify-center items-center relative py-4"
                >
                  <div className={`font-bold ${type === "forYou" ? "text-white" : "text-gray-500"}`}>Posts</div>
                  {type === "forYou" && (
                    <div className="absolute bottom-0 w-14 h-1 rounded-full bg-blue-500"></div>
                  )}
                </button>
                <button
                  onClick={() => setType("following")}
                  className="cursor-pointer hover:bg-gray-900/50 transition duration-200 w-full flex justify-center items-center relative py-4"
                >
                  <div className={`font-bold ${type === "following" ? "text-white" : "text-gray-500"}`}>Likes</div>
                  {type === "following" && (
                    <div className="absolute bottom-0 w-14 h-1 rounded-full bg-blue-500"></div>
                  )}
                </button>
              </div>
            </div>
            <div className="post">
              {postLoading && (
                <div className="flex justify-center h-full items-center absolute top-40 left-1/2">
                  <span className="loading loading-spinner w-10" />
                </div>
              )}
              {!postLoading && filtered?.length === 0 && (
                <p className="text-center my-4">
                  No posts in this tab. Switch 👻
                </p>
              )}
              {!postLoading &&
                filtered?.length > 0 &&
                filtered.map((post) => (
                  <PostDetails key={post?._id} onePost={post} />
                ))}
            </div>
          </div>
        </>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default Profile;
