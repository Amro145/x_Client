import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/api/authApi";

const MobileNav = () => {
    const { userData } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 flex justify-around items-center py-3 z-50 backdrop-blur-md bg-black/90 px-4">
            <Link to="/" className="p-2 transition-colors">
                <MdHomeFilled
                    size={28}
                    className={isActive("/") ? "text-white" : "text-gray-500"}
                />
            </Link>
            <Link to="/notification" className="p-2 transition-colors">
                <IoNotifications
                    size={28}
                    className={isActive("/notification") ? "text-white" : "text-gray-500"}
                />
            </Link>
            <Link to={`/profile/${userData?._id}`} className="p-2 transition-colors">
                <FaUser
                    size={24}
                    className={isActive(`/profile/${userData?._id}`) ? "text-white" : "text-gray-500"}
                />
            </Link>
            <button
                onClick={() => dispatch(logout())}
                className="p-2 text-gray-500 hover:text-red-500 transition-colors cursor-pointer"
            >
                <BiLogOut size={28} />
            </button>
        </div>
    );
};

export default MobileNav;
