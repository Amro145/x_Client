import { createSlice } from "@reduxjs/toolkit";
import { createComment, createPost, deletePost, getAllPosts, getFollowingPosts, getLikedPosts, getPost, getUserPosts, likeUnLike } from "../api/postApi"

const initialState = {
    allPostList: [],
    userPostsList: [],
    followingPostsList: [],
    likedPostsList: [],
    post: [],
    postLoading: false,
    loadingMore: false,
    creatPostLoading: false,
    commentLoading: false,
    error: null,
    commentError: null,
    pagination: {
        currentPage: 1,
        totalPages: 1,
        totalPosts: 0
    }
}
const postSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetPosts: (state) => {
            state.allPostList = [];
            state.pagination = {
                currentPage: 1,
                totalPages: 1,
                totalPosts: 0
            };
        },
        resetErrors: (state) => {
            state.error = null;
            state.commentError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // allpost
            .addCase(createPost.pending, (state) => {
                state.postLoading = true;
                state.creatPostLoading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.creatPostLoading = false;
                if (action.payload) {
                    state.allPostList = [action.payload, ...state.allPostList];
                }
            })
            .addCase(createPost.rejected, (state, action) => {
                state.postLoading = false;
                state.creatPostLoading = false;
                state.error = action.payload || action.error.message;
            })
            // getAllPosts
            .addCase(getAllPosts.pending, (state, action) => {
                const isInitial = action.meta.arg?.page === 1 || !action.meta.arg?.page;
                if (isInitial) {
                    state.postLoading = true;
                } else {
                    state.loadingMore = true;
                }
                state.error = null;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.loadingMore = false;

                const newPosts = action.payload.posts || [];
                const currentPage = action.payload.currentPage;

                if (currentPage === 1) {
                    state.allPostList = newPosts;
                } else {
                    // Filter duplicates before appending
                    const existingIds = new Set(state.allPostList.map(post => post._id));
                    const uniqueNewPosts = newPosts.filter(post => !existingIds.has(post._id));
                    state.allPostList = [...state.allPostList, ...uniqueNewPosts];
                }

                state.pagination = {
                    currentPage: action.payload.currentPage,
                    totalPages: action.payload.totalPages,
                    totalPosts: action.payload.totalPosts
                };
            })
            .addCase(getAllPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.loadingMore = false;
                state.error = action.error.message;
            })
            // one post
            .addCase(getPost.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.postLoading = false;
                state.post = action.payload;
            })
            .addCase(getPost.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload || action.error.message;
            })
            // following post
            .addCase(getFollowingPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getFollowingPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.followingPostsList = action.payload;
            })
            .addCase(getFollowingPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })
            // liked post
            .addCase(getLikedPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getLikedPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.likedPostsList = action.payload;
            })
            .addCase(getLikedPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload
            })
            // user post
            .addCase(getUserPosts.pending, (state) => {
                state.postLoading = true;
                state.error = null;
            })
            .addCase(getUserPosts.fulfilled, (state, action) => {
                state.postLoading = false;
                state.userPostsList = action.payload;
            })
            .addCase(getUserPosts.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })
            // delete Post
            .addCase(deletePost.pending, (state) => {
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.postLoading = false;
                const deletedId = action.payload.id;
                state.allPostList = state.allPostList.filter(p => p._id !== deletedId);
                if (state.post && state.post._id === deletedId) {
                    state.post = null;
                }
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })
            // comment on Post
            .addCase(createComment.pending, (state) => {
                state.commentLoading = true;
                state.commentError = null;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.commentLoading = false;
                const updatedPost = action.payload;
                state.allPostList = state.allPostList.map(p =>
                    p._id === updatedPost._id ? updatedPost : p
                );
                if (state.post && state.post._id === updatedPost._id) {
                    state.post = updatedPost;
                }
            })
            .addCase(createComment.rejected, (state, action) => {
                state.commentLoading = false;
                state.commentError = action.payload;
            })
            // like un like on Post
            .addCase(likeUnLike.pending, (state) => {
                state.error = null;
            })
            .addCase(likeUnLike.fulfilled, (state, action) => {
                const updatedPost = action.payload;
                state.allPostList = state.allPostList.map(p =>
                    p._id === updatedPost._id ? updatedPost : p
                );
                if (state.post && state.post._id === updatedPost._id) {
                    state.post = updatedPost;
                }
            })
            .addCase(likeUnLike.rejected, (state, action) => {
                state.postLoading = false;
                state.error = action.payload;
            })
            // logout
            .addCase("auth/logout/fulfilled", (state) => {
                state.allPostList = [];
                state.userPostsList = [];
                state.followingPostsList = [];
                state.likedPostsList = [];
                state.post = [];
                state.pagination = {
                    currentPage: 1,
                    totalPages: 1,
                    totalPosts: 0
                };
            })
            .addCase("auth/logout/rejected", (state) => {
                state.allPostList = [];
                state.userPostsList = [];
                state.followingPostsList = [];
                state.likedPostsList = [];
                state.post = [];
                state.pagination = {
                    currentPage: 1,
                    totalPages: 1,
                    totalPosts: 0
                };
            })


    }
})
export const { resetPosts, resetErrors } = postSlice.actions;
export default postSlice.reducer