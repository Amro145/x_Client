import React, { useState } from "react";
import Navbar2 from "./Navbar2";
import { getAllPosts, getFollowingPosts } from "../../../store (3)/api/postApi";
import { useDispatch } from "react-redux";


function Navbar() {
  

  const dispatch = useDispatch();
  return (
    <>
      <Navbar2 />
  
    </>
  );
}

export default Navbar;
