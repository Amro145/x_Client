import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { logout } from "../../../store (3)/api/authApi";
function Navbar2() {
  const { userData } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="block md:hidden border-b border-gray-100 w-full">
      <ul className="flex justify-between w-full">
        <Link to="/" className="hover:bg-gray-100/30 py-5 px-5  rounded-full flex justify-center items-center ">
          <li>
            <MdHomeFilled size={25} />
          </li>
        </Link>
        <Link to="/notifiction" className="hover:bg-gray-100/30 py-5 px-5  rounded-full flex justify-center items-center ">
          <li>
            <IoNotifications size={25} />
          </li>

        </Link>
        <Link to={`/profile/${userData?._id}`} className="hover:bg-gray-100/30 py-5 px-5  rounded-full flex justify-center items-center ">
          <li>
            <FaUser size={25} />
          </li>
        </Link>
        <Link to="/suggested" className="hover:bg-gray-100/30 py-5 px-5  rounded-full flex justify-center items-center ">
          <li>
            <FaUser size={25} />
          </li>
        </Link>
        <div onClick={() => dispatch(logout())} className="cursor-pointer hover:bg-gray-100/30 py-5 px-5  rounded-full flex justify-center items-center ">
          <li>
            <BiLogOut size={25} />
          </li>
        </div>


      </ul >
    </div >
  );
}

export default Navbar2;
