import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  deleteNotifications,
  notification,
} from "../../../store/api/notificationApi";
import NotifiactionData from "./NotifiactionData";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { BiSolidLeftArrowCircle } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
function Notification() {
  const { notificationList, notificationLoading } = useSelector(
    (state) => state.notification
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notification());
  }, [dispatch]);
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to Delete All Notifiaction!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNotifications());
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };
  useEffect(() => {
    console.log(notificationList);
  }, [notificationList]);

  return (
    <div className="w-full">
      {notificationLoading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}

      <div>
        <div className="header flex justify-between px-4 py-3 items-center w-full border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-md z-10">
          <Link to={"/"} className="hover:bg-gray-900 rounded-full p-2 transition-colors">
            <BiSolidLeftArrowCircle size={24} className="text-white" />
          </Link>
          <div className="dropdown dropdown-end cursor-pointer">
            <div tabIndex={0} role="button" className="m-1 hover:bg-gray-900 rounded-full p-2 transition-colors">
              {notificationList?.length !== 0 && (
                <IoSettingsOutline className="w-5 h-5 text-white" />
              )}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-lg bg-black border border-gray-800 rounded-xl w-52"
            >
              <li>
                <a onClick={handleDelete} className="text-red-500 hover:bg-gray-900 font-bold">Delete all notifications</a>
              </li>
            </ul>
          </div>
        </div>
        {!notificationLoading && notificationList?.length === 0 && (
          <p className=" flex  justify-center mt-10 font-bold">
            No Notification
          </p>
        )}
        {notificationList?.length > 0 &&
          !notificationLoading &&
          notificationList?.map((notifiction) => (
            <NotifiactionData
              notifiction={notifiction}
              key={notifiction?._id}
            />
          ))}
      </div>
    </div>
  );
}

export default Notification;
