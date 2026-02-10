import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFollowers } from "../../../store/api/authApi";
import { Link, useParams } from "react-router-dom";
import FollowData from "./FollowData";
import { BiSolidLeftArrowCircle } from "react-icons/bi";

function Followers() {
  const { followersList, getFollowLoading } = useSelector((state) => state.auth);
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowers(params.id));
  }, [dispatch, params.id]);

  return (
    <div className="w-full min-h-screen">
      <div className="header flex items-center gap-6 px-4 py-3 sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-gray-800">
        <Link to={`/profile/${params.id}`} className="hover:bg-gray-900 rounded-full p-2 transition-colors">
          <BiSolidLeftArrowCircle size={24} className="text-white" />
        </Link>
        <h1 className="text-xl font-bold text-white">Followers</h1>
      </div>

      {getFollowLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : followersList?.length === 0 ? (
        <p className="text-center text-gray-500 mt-20 text-xl font-bold">
          No Followers yet 👻
        </p>
      ) : (
        <div className="py-2">
          {followersList?.map((user) => (
            <FollowData user={user} key={user?._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Followers;
