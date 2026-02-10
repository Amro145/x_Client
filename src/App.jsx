import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/AuthPage/Signup";
import Login from "./components/AuthPage/Login";
import Home from "./components/Home/Home";
import Notification from "./components/Notification/Notification";
import Profile from "./components/profile/Profile";
import Followers from "./components/profile/Followers";
import Following from "./components/profile/Following";
import PostPage from "./components/PostPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "../store/api/authApi";
import Suggested from "./components/Home/Rightpar/Suggested";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { userData, checkLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check authentication status
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={!userData || userData.length === 0 ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!userData || userData.length === 0 ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Notification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/suggested"
          element={
            <ProtectedRoute>
              <Suggested />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/followers/:id"
          element={
            <ProtectedRoute>
              <Followers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/following/:id"
          element={
            <ProtectedRoute>
              <Following />
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>
          }
        />
        <Route path="/server-error" element={<ServerError />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
