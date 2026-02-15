import { createSlice } from "@reduxjs/toolkit";
import {
    checkAuth,
    getFollowers,
    getFollowing,
    login, logout, signup
} from "../api/authApi";
import { editPassword, editProfile, followUnFollow, ProfileFn, suggestedUser } from "../api/userApi";

const initialState = {
    userData: JSON.parse(localStorage.getItem("userData")) || null,
    loading: false,
    loginError: null,
    signupError: null,
    checkLoading: false,
    myProfile: [],
    followingList: [],
    followersList: [],
    getFollowLoading: false,
    suggestedUserList: [],
    suggestedLoading: false,
    followStatus: null,
    followLoading: false,
    profileLoading: false,

}
const authSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetErrors: (state) => {
            state.loginError = null;
            state.signupError = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // profile function
            .addCase(ProfileFn.pending, (state) => {
                state.profileLoading = true;
                state.error = null
            })
            .addCase(ProfileFn.fulfilled, (state, action) => {
                state.profileLoading = false;
                state.myProfile = action.payload
            })
            .addCase(ProfileFn.rejected, (state, action) => {
                state.profileLoading = false;
                state.error = action.error.message
            })

            // suggested User
            .addCase(suggestedUser.pending, (state) => {
                state.suggestedLoading = true;
                state.error = null
            })
            .addCase(suggestedUser.fulfilled, (state, action) => {
                state.suggestedLoading = false;
                state.suggestedUserList = action.payload
            })
            .addCase(suggestedUser.rejected, (state, action) => {
                state.suggestedLoading = false;
                state.error = action.error.message
            })

            //follow and un follow
            .addCase(followUnFollow.pending, (state) => {
                state.followLoading = true;
                state.error = null
            })
            .addCase(followUnFollow.fulfilled, (state, action) => {
                state.followLoading = false;
                state.followStatus = action.payload.isFollowing ? "followed" : "unfollowed";
                state.userData = action.payload.myAccount;
                localStorage.setItem("userData", JSON.stringify(action.payload.myAccount));

                // If the user we just followed/unfollowed is the one on the current profile page, update it
                if (state.myProfile && state.myProfile?._id === action.payload.followedUser?._id) {
                    state.myProfile = action.payload.followedUser;
                }
            })
            .addCase(followUnFollow.rejected, (state, action) => {
                state.followLoading = false;
                state.error = action.error.message;
            })

            //singup
            .addCase(signup.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload));
            })
            .addCase(signup.rejected, (state, action) => {
                state.loading = false;
                state.signupError = action.payload
            })
            // login
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.signupError = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload));

            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.loginError = action.payload
            })
            // logout
            .addCase(logout.pending, (state) => {
                state.loading = true;
                state.loginError = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false;
                state.userData = null;
                state.myProfile = [];
                state.followingList = [];
                state.followersList = [];
                state.suggestedUserList = [];
                localStorage.removeItem("userData");
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
                state.userData = null;
                state.myProfile = [];
                state.followingList = [];
                state.followersList = [];
                state.suggestedUserList = [];
                localStorage.removeItem("userData");
                state.error = action.error.message;
            })
            //checkAuth
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
                state.checkLoading = true;
                state.error = null
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                state.checkLoading = false;
                state.userData = action.payload
            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.loading = false;
                state.checkLoading = false;
                state.userData = null;
                state.myProfile = [];
                localStorage.removeItem("userData");
                state.error = action.error.message;
            })
            // edit profile
            .addCase(editProfile.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(editProfile.fulfilled, (state, action) => {
                state.loading = false
                state.userData = action.payload
                if (state.myProfile && state.myProfile?._id === action.payload?._id) {
                    state.myProfile = action.payload
                }
            })
            .addCase(editProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message
            })
            // edit password
            .addCase(editPassword.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(editPassword.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload
            })
            .addCase(editPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message
            })
            //getFollowing
            .addCase(getFollowing.pending, (state) => {
                state.getFollowLoading = true;
                state.error = null
            })
            .addCase(getFollowing.fulfilled, (state, action) => {
                state.getFollowLoading = false;
                state.followingList = action.payload
            })
            .addCase(getFollowing.rejected, (state, action) => {
                state.getFollowLoading = false;
                state.error = action.payload
            })
            //getFollowers   
            .addCase(getFollowers.pending, (state) => {
                state.getFollowLoading = true;
                state.error = null
            })
            .addCase(getFollowers.fulfilled, (state, action) => {
                state.getFollowLoading = false;
                state.followersList = action.payload
            })
            .addCase(getFollowers.rejected, (state, action) => {
                state.getFollowLoading = false;
                state.error = action.payload
            })

    }
})

export const { resetErrors } = authSlice.actions;
export default authSlice.reducer