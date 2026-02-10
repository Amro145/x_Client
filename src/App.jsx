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
import Layout from "./components/Layout";

function App() {
  const { userData, checkLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    // Check authentication status
    dispatch(checkAuth());
  }, [dispatch]);

  if (checkLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  const isAuth = userData && !Array.isArray(userData) && userData._id;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={!isAuth ? <Signup /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/notification"
          element={
            <ProtectedRoute>
              <Layout>
                <Notification />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/suggested"
          element={
            <ProtectedRoute>
              <Layout>
                <Suggested />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/followers/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Followers />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/following/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <Following />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/post/:id"
          element={
            <ProtectedRoute>
              <Layout>
                <PostPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
