import React from "react";
import Navbar from "./Navbar";
import CreatePost from "./post/CreatePost";
import Post from "./post/Post";

function Home() {
  return (
    <>
      <Navbar />
      <div className="mt-2">
        <CreatePost />
      </div>
      <div className="mt-4">
        <Post />
      </div>
    </>
  );
}

export default Home;
