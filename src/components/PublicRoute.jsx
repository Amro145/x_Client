import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = ({ children }) => {
    const { userData, checkLoading } = useSelector((state) => state.auth);

    if (checkLoading) {
        return (
            <div className="flex justify-center items-center h-screen bg-black">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
            </div>
        );
    }

    const isAuth = userData && !Array.isArray(userData) && userData._id;

    if (isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PublicRoute;
