import React, { useState } from "react";
import { MdOutlineMail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store (3)/api/authApi";
import Swal from "sweetalert2";

function Login() {
  const { loading, loginError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!cleanData.email || !cleanData.email.trim()) {
      Swal.fire({
        text: "Email is Required!",
        timer: 1500,
      });
    } else if (!cleanData.password) {
      Swal.fire({
        text: " Password is Required!",
        timer: 1500,
      });
    } else {
      return true;
    }
  };
  const cleanData = {
    email: formData.email,
    password: formData.password,
  };
  const handleonChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (data) => {
    if (validateForm() === true) {
      dispatch(login(data));
      console.log(loginError);
    }
  };
  return (
    <div className="flex flex-col justify-center items-center md:grid md:grid-cols-12 md:gap-4 w-full h-screen overflow-hidden bg-black text-white">
      {loading ? (
        <div className="flex justify-center items-center h-screen w-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : (
        <>
          <div className="col-span-7 flex justify-center items-center h-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-1/3 w-1/3 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              viewBox="0 0 16 16"
            >
              <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
            </svg>
          </div>
          <div className="col-span-12 md:col-span-5 flex flex-col justify-center px-8 md:px-12">
            <div className="title text-5xl md:text-7xl mb-8 md:mb-12">
              Happening now
            </div>
            <div className="text-2xl md:text-3xl font-bold mb-8">
              Join today.
            </div>

            {(loginError && formData.email !== "") ||
              (formData.password !== "" && (
                <div className="text-red-500 mb-4 font-medium bg-red-500/10 p-3 rounded-lg border border-red-500/20">{loginError}</div>
              ))}

            <form className="grid gap-4 w-full md:w-[300px]">
              <label className="input input-bordered rounded-full flex items-center gap-2 bg-black border border-gray-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                <MdOutlineMail className="text-gray-500" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="grow text-white placeholder-gray-500"
                  value={formData.email}
                  onChange={handleonChange}
                />
              </label>

              <label className="input input-bordered rounded-full flex items-center gap-2 bg-black border border-gray-700 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all duration-200">
                <MdPassword className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Password"
                  className="grow text-white placeholder-gray-500"
                  value={formData.password}
                  name="password"
                  onChange={handleonChange}
                />
              </label>

              <button
                className="btn rounded-full bg-white text-black hover:bg-gray-200 border-none font-bold text-lg w-full mt-2 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(cleanData);
                }}
              >
                Log in
              </button>
            </form>

            <div className="flex flex-col w-full md:w-[300px] gap-2 mt-8">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-[1px] bg-gray-700 flex-1"></div>
                <span className="text-gray-500 text-sm">or</span>
                <div className="h-[1px] bg-gray-700 flex-1"></div>
              </div>

              <p className="text-white text-lg font-medium mb-2">Don't have an account?</p>
              <Link to="/signup">
                <button className="btn rounded-full btn-outline text-blue-400 border-gray-700 hover:bg-blue-500/10 w-full font-bold">
                  Create account
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
