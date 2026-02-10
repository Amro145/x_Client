import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPosts, getFollowingPosts } from "../../../store/api/postApi";
import { resetPosts } from "../../../store/slice/postSlice";

function Navbar2() {
  const [feedType, setFeedType] = useState("forYou");
  const dispatch = useDispatch();

  const handleTabChange = (type) => {
    setFeedType(type);
    dispatch(resetPosts());
    if (type === "forYou") {
      dispatch(getAllPosts({ page: 1, limit: 10 }));
    } else {
      dispatch(getFollowingPosts({ page: 1, limit: 10 }));
    }
  };

  return (
    <div className="flex w-full border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-md z-10">
      <div
        className="flex-1 flex justify-center p-4 hover:bg-gray-900 transition duration-300 cursor-pointer relative"
        onClick={() => handleTabChange("forYou")}
      >
        <span className={`font-bold ${feedType === "forYou" ? "text-white" : "text-gray-500"}`}>
          For you
        </span>
        {feedType === "forYou" && (
          <div className="absolute bottom-0 w-16 h-1 rounded-full bg-blue-500"></div>
        )}
      </div>
      <div
        className="flex-1 flex justify-center p-4 hover:bg-gray-900 transition duration-300 cursor-pointer relative"
        onClick={() => handleTabChange("following")}
      >
        <span className={`font-bold ${feedType === "following" ? "text-white" : "text-gray-500"}`}>
          Following
        </span>
        {feedType === "following" && (
          <div className="absolute bottom-0 w-16 h-1 rounded-full bg-blue-500"></div>
        )}
      </div>
    </div>
  );
}

export default Navbar2;
