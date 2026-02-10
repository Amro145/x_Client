import React from "react";
import Navbar from "./Navbar";
import CreatePost from "./post/CreatePost";
import Sidbar from "./sidebar/Sidebar";
import Rightbar from "./Rightpar/Rightbar";
import Post from "./post/Post";
import MobileNav from "./MobileNav";

function Home() {
  return (
    <>
      <div className="flex justify-center bg-black text-white min-h-screen max-w-7xl mx-auto">
        {/* Left Sidebar - Fixed on desktop */}
        <div className="hidden md:block w-fit lg:w-72 sticky top-0 h-screen">
          <Sidbar />
        </div>

        {/* Main Content */}
        <div className="flex-1 max-w-[600px] border-x border-gray-800 min-h-screen pb-20 md:pb-0">
          <Navbar />
          <div className="mt-2">
            <CreatePost />
          </div>
          <div className="mt-4">
            <Post />
          </div>
        </div>

        {/* Right Sidebar - Fixed on large screens */}
        <div className="hidden lg:block w-80 sticky top-0 h-screen py-4 px-4">
          <Rightbar />
        </div>
      </div>
      <MobileNav />
    </>
  );
}

export default Home;
