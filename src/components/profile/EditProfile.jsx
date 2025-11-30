import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPassword, editProfile } from "../../../store (3)/api/userApi";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const { userData, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userName: userData.userName,
    email: userData.email,
    bio: userData.bio,
    link: userData.link,
    password: "",
    oldPassword: "",
  });

  const PasswordData = {
    password: formData.password, // Fixed: Removed [0]
    oldPassword: formData.oldPassword, // Fixed: Removed [0]
  };

  const cleanData = {
    userName: formData.userName.toString(),
    email: formData.email.toString(),
    bio: formData.bio.toString(),
    link: formData.link.toString(),
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateProfile = (data) => {
    dispatch(editProfile(data));
    console.log(data);
  };

  const handleUpdatePassword = async (data) => {
    const resultAction = await dispatch(editPassword(data));
    if (editPassword.fulfilled.match(resultAction)) {
      document.getElementById("edit_profile_password").close();
      setFormData({ ...formData, password: "", oldPassword: "" });
    }
  };

  return (
    <div className="pl-10 mt-10">
      <button
        className="btn btn-outline px-10 btn-sm w-auto rounded-2xl"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <button
        className="btn btn-outline px-10 btn-sm w-auto rounded-2xl"
        onClick={() =>
          document.getElementById("edit_profile_password").showModal()
        }
      >
        Edit Password
      </button>
      <dialog id="edit_profile_modal" className="modal backdrop-blur-sm">
        <div className="modal-box bg-black border border-gray-800 rounded-2xl shadow-2xl max-w-2xl">
          <div className="py-4 border-b border-gray-800 mb-4">
            <h3 className="font-bold text-xl text-white">Edit Profile</h3>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdateProfile(cleanData);
              if (!error) {
                document.getElementById("edit_profile_modal").close();
                navigate("/");
              }
            }}
            className="flex flex-col gap-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-500">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Email"
                  className="input input-bordered bg-black border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                  value={formData.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-500">Link</span>
                </label>
                <input
                  type="text"
                  placeholder="Link"
                  className="input input-bordered bg-black border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                  value={formData?.link}
                  name="link"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-500">Username</span>
                </label>
                <input
                  type="text"
                  placeholder="Username"
                  className="input input-bordered bg-black border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                  value={formData.userName}
                  name="userName"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-500">Bio</span>
                </label>
                <input
                  type="text"
                  placeholder="Bio"
                  className="input input-bordered bg-black border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                  value={formData?.bio}
                  name="bio"
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost text-white hover:bg-gray-900 rounded-full"
                onClick={() => document.getElementById("edit_profile_modal").close()}
              >
                Cancel
              </button>
              <button className="btn bg-white text-black hover:bg-gray-200 rounded-full px-6 font-bold border-none">
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">close</button>
        </form>
      </dialog>
      <dialog id="edit_profile_password" className="modal z-10">
        <div className="main bg-black p-10 border border-gray-700 rounded-2xl ">
          <div className="py-5">
            <h1 className="font-bold">Update password</h1>
          </div>
          <div className="form flex ">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdatePassword(PasswordData);
              }}
            >
              <div className="tow flex gap-5 my-2">
                <input
                  type="password"
                  placeholder="Old Password"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData?.oldPassword}
                  name="oldPassword"
                  onChange={handleInputChange}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="flex-1 input border border-gray-700 rounded p-2 input-md"
                  value={formData.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <button className="btn btn-primary rounded-full btn-sm text-white">
                Update Password
              </button>
              {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            </form>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none  w-full ">close</button>
        </form>
      </dialog>
    </div>
  );
}

export default EditProfile;
