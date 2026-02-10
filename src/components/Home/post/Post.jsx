import React, { useEffect, useRef, useCallback } from "react";
import PostDetails from "./PostDetails";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../../../store/api/postApi";

function Post() {
  const dispatch = useDispatch();
  const { postLoading, loadingMore, allPostList, pagination } = useSelector((state) => state.post);
  const { loading: authLoading } = useSelector((state) => state.auth);

  // Initial load
  useEffect(() => {
    dispatch(getAllPosts({ page: 1, limit: 10 }));
  }, [dispatch]);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (postLoading || loadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && pagination.currentPage < pagination.totalPages) {
          dispatch(getAllPosts({ page: pagination.currentPage + 1, limit: 10 }));
        }
      });

      if (node) observer.current.observe(node);
    },
    [postLoading, loadingMore, pagination, dispatch]
  );

  return (
    <div className="w-full">
      {postLoading && !loadingMore ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      ) : allPostList?.length === 0 ? (
        <p className="text-center my-10 text-gray-500">No posts in this tab. Switch 👻</p>
      ) : (
        <div className="w-full">
          {allPostList.map((post, index) => {
            if (allPostList.length === index + 1) {
              return (
                <div ref={lastPostElementRef} key={post?._id}>
                  <PostDetails onePost={post} />
                </div>
              );
            } else {
              return <PostDetails key={post?._id} onePost={post} />;
            }
          })}

          {loadingMore && (
            <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
            </div>
          )}

          {!loadingMore && pagination.currentPage >= pagination.totalPages && allPostList.length > 0 && (
            <div className="flex justify-center items-center h-24 w-full border-t border-gray-800 text-gray-500 font-medium">
              You've seen all the posts ✨
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Post;
