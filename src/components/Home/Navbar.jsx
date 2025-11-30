import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import { getAllPosts, getFollowingPosts } from "../../../store (3)/api/postApi";
import { useDispatch } from "react-redux";


function Navbar() {
  const [type, setType] = useState("forYou");

  const dispatch = useDispatch();
  return (
    <>
      <Navbar2 />
      <div
        className="relative border-b border-gray-800 flex justify-around text-center min-h-[53px] backdrop-blur-md bg-black/60 sticky top-0 z-10"
      >
        <button
          onClick={() => {
            setType("forYou");
            dispatch(getAllPosts());
          }}
          className="cursor-pointer hover:bg-gray-900/50 transition duration-200 w-full flex justify-center items-center relative"
        >
          <div className={`py-4 font-bold ${type === "forYou" ? "text-white" : "text-gray-500"}`}>For you</div>
          {type === "forYou" && (
            <div className="absolute bottom-0 w-14 h-1 rounded-full bg-blue-500"></div>
          )}
        </button>
        <button
          onClick={() => {
            setType("following");
            dispatch(getFollowingPosts());
          }}
          className="cursor-pointer hover:bg-gray-900/50 transition duration-200 w-full flex justify-center items-center relative"
        >
          <div className={`py-4 font-bold ${type === "following" ? "text-white" : "text-gray-500"}`}>Following</div>
          {type === "following" && (
            <div className="absolute bottom-0 w-14 h-1 rounded-full bg-blue-500"></div>
          )}
        </button>
      </div>
    </>
  );
}

export default Navbar;
