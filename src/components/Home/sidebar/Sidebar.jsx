import React, { useEffect } from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ProfileFn } from "../../../../store (3)/api/userApi";
import { logout } from "../../../../store (3)/api/authApi";
import { notification } from "../../../../store (3)/api/notificationApi";
function Sidbar() {
  const { userData } = useSelector((state) => state.auth);
  const { notificationList } = useSelector((state) => state.notification);
  const dispatch = useDispatch();
  const { checkLoading } = useSelector((state) => state.notification);
  useEffect(() => {
    dispatch(notification());
  }, [dispatch]);
  return (
    <div className=" hidden md:flex flex-col h-screen justify-start ">
      <Link to="/">
        <div className="logo flex  pl-10 pt-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-twitter-x h-8 w-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] mb-10 md:mb-0"
            viewBox="0 0 16 16"
          >
            <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
          </svg>
        </div>
      </Link>
      {checkLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <div className="flex flex-col justify-around h-full ">
          <div className="ul ">
            <ul className="flex flex-col px-2  h-60 justify-around">
              <Link to={`/`}>
                <li className="home flex items-center gap-4 px-4 py-3 hover:bg-gray-900 cursor-pointer duration-200 rounded-full w-fit">
                  <MdHomeFilled className="w-7 h-7" />
                  <span className="font-bold text-xl hidden xl:block">Home</span>
                </li>
              </Link>
              <Link to={`/notifiction`}>
                <li className="notfiction relative flex items-center gap-4 px-4 py-3 hover:bg-gray-900 cursor-pointer duration-200 rounded-full w-fit">
                  <IoNotifications className="w-7 h-7" />
                  <div className="font-bold text-xl hidden xl:block">Notifications</div>
                  {notificationList.length !== 0 && (
                    <div className="bg-blue-500 absolute top-2 left-6 p-1.5 rounded-full border-2 border-black"></div>
                  )}
                </li>
              </Link>

              <Link to={`/profile/${userData?._id || "/"}`}>
                <li className="profile flex items-center gap-4 px-4 py-3 hover:bg-gray-900 cursor-pointer duration-200 rounded-full w-fit">
                  <FaUser className="w-6 h-6" />
                  <span className="font-bold text-xl hidden xl:block">Profile</span>
                </li>
              </Link>
            </ul>
          </div>

          <div className="logout sticky">
            <div className="flex pr-5">
              <Link
                to={`/profile/${userData?._id}`}
                className="info flex items-center gap-3 hover:bg-gray-900 p-3 rounded-full transition-colors duration-200 w-full"
          
              >
                <div className="avatar hidden md:inline-flex">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={userData?.profileImg || "/avatar-placeholder.png"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="text hidden xl:flex xl:flex-col">
                  <span className="font-bold text-sm"> {userData?.userName || "no username"}</span>
                  <span className="text-gray-500 text-sm"> @{userData?.userName}</span>
                </div>
              </Link>

              <div className="logout cursor-pointer hover:bg-gray-900/30 rounded-full flex justify-center items-center pr-4">
                <Link onClick={() => dispatch(logout())}>
                  <BiLogOut className="h-8 w-8 cursor-pointer" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Sidbar;
