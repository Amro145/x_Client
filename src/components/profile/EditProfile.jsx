import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPassword, editProfile } from "../../../store/api/userApi";
import { resetErrors } from "../../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate();
  const { userData, error, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    userName: userData?.userName || "",
    email: userData?.email || "",
    bio: userData?.bio || "",
    link: userData?.link || "",
    password: "",
    oldPassword: "",
  });

  useEffect(() => {
    dispatch(resetErrors());
  }, [dispatch]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) dispatch(resetErrors());
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!formData.userName.trim() || !formData.email.trim()) {
      Swal.fire({ text: "Username and Email are required!", icon: "error", timer: 1500 });
      return;
    }

    const cleanData = {
      userName: formData.userName.trim(),
      email: formData.email.trim(),
      bio: formData.bio.trim(),
      link: formData.link.trim(),
    };

    const resultAction = await dispatch(editProfile(cleanData));
    if (editProfile.fulfilled.match(resultAction)) {
      document.getElementById("edit_profile_modal").close();
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!formData.oldPassword || !formData.password) {
      Swal.fire({ text: "Both current and new passwords are required!", icon: "error", timer: 1500 });
      return;
    }
    if (formData.password.length < 6) {
      Swal.fire({ text: "New password must be at least 6 characters!", icon: "error", timer: 1500 });
      return;
    }

    const PasswordData = {
      password: formData.password,
      oldPassword: formData.oldPassword,
    };

    const resultAction = await dispatch(editPassword(PasswordData));
    if (editPassword.fulfilled.match(resultAction)) {
      document.getElementById("edit_profile_password").close();
      setFormData({ ...formData, password: "", oldPassword: "" });
    }
  };

  return (
    <div className="flex gap-4">
      <button
        className="btn btn-outline px-6 btn-sm rounded-full transition-all duration-200 hover:bg-white/10"
        onClick={() => {
          dispatch(resetErrors());
          document.getElementById("edit_profile_modal").showModal();
        }}
      >
        Edit profile
      </button>
      <button
        className="btn btn-outline px-6 btn-sm rounded-full transition-all duration-200 hover:bg-white/10"
        onClick={() => {
          dispatch(resetErrors());
          document.getElementById("edit_profile_password").showModal();
        }}
      >
        Change Password
      </button>

      {/* Edit Profile Modal */}
      <dialog id="edit_profile_modal" className="modal backdrop-blur-sm">
        <div className="modal-box bg-black border border-gray-800 rounded-2xl shadow-2xl max-w-2xl">
          <div className="py-4 border-b border-gray-800 mb-6">
            <h3 className="font-bold text-xl text-white">Edit Profile</h3>
          </div>
          <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-400 font-medium">Username</span>
                </label>
                <input
                  type="text"
                  name="userName"
                  className="input input-bordered bg-gray-900 border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                  value={formData.userName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-400 font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="input input-bordered bg-gray-900 border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-gray-400 font-medium">Bio</span>
                </label>
                <textarea
                  name="bio"
                  className="textarea textarea-bordered bg-gray-900 border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full h-24 resize-none"
                  value={formData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us about yourself..."
                />
              </div>
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text text-gray-400 font-medium">Website Link</span>
                </label>
                <input
                  type="text"
                  name="link"
                  className="input input-bordered bg-gray-900 border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost text-white hover:bg-white/10 rounded-full"
                onClick={() => document.getElementById("edit_profile_modal").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-white text-black hover:bg-gray-200 rounded-full px-8 font-bold border-none"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">close</button>
        </form>
      </dialog>

      {/* Change Password Modal */}
      <dialog id="edit_profile_password" className="modal backdrop-blur-sm">
        <div className="modal-box bg-black border border-gray-800 rounded-2xl shadow-2xl max-w-md">
          <div className="py-4 border-b border-gray-800 mb-6">
            <h3 className="font-bold text-xl text-white">Update Password</h3>
          </div>
          <form onSubmit={handleUpdatePassword} className="flex flex-col gap-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-400 font-medium">Current Password</span>
              </label>
              <input
                type="password"
                name="oldPassword"
                className="input input-bordered bg-gray-900 border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                value={formData.oldPassword}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-400 font-medium">New Password</span>
              </label>
              <input
                type="password"
                name="password"
                className="input input-bordered bg-gray-900 border-gray-700 focus:border-blue-500 focus:outline-none text-white w-full"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                {error}
              </div>
            )}

            <div className="modal-action">
              <button
                type="button"
                className="btn btn-ghost text-white hover:bg-white/10 rounded-full"
                onClick={() => document.getElementById("edit_profile_password").close()}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-full px-8 text-white font-bold border-none"
                disabled={loading}
              >
                {loading ? <span className="loading loading-spinner loading-xs"></span> : "Update"}
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="cursor-default">close</button>
        </form>
      </dialog>
    </div>
  );
}

export default EditProfile;
