import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "../../store/api/postApi";
import PostDetails from "./Home/post/PostDetails";
import { BiSolidLeftArrowCircle } from "react-icons/bi";

function PostPage() {
    const { id } = useParams();
    console.log(id);
    const dispatch = useDispatch();
    const { post, postLoading, error } = useSelector((state) => state.post);

    useEffect(() => {
        if (id) {
            dispatch(getPost(id));
        }
    }, [dispatch, id]);

    return (
        <div className="w-full min-h-screen bg-black text-white">
            <div className="header flex justify-between px-4 py-3 items-center w-full border-b border-gray-800 sticky top-0 bg-black/80 backdrop-blur-md z-10">
                <Link to="/" className="hover:bg-gray-900 rounded-full p-2 transition-colors">
                    <BiSolidLeftArrowCircle size={24} className="text-white" />
                </Link>
                <div className="font-bold text-lg">Post</div>
                <div className="w-8"></div> {/* Spacer for centering */}
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-2xl border-x border-gray-800 min-h-screen">
                    {postLoading && (
                        <div className="flex justify-center items-center h-40">
                            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
                        </div>
                    )}

                    {error && (
                        <div className="text-red-500 text-center p-4">
                            {error}
                        </div>
                    )}

                    {!postLoading && post && !error && (
                        <PostDetails onePost={post} />
                    )}

                    {!postLoading && !post && !error && (
                        <div className="text-center p-4 text-gray-500">Post not found</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PostPage;