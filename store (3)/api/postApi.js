import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import Swal from "sweetalert2"
const showNotification = (title, icon) => {
    Swal.fire({
        title: title,
        icon: icon,
        timer: 1000,
        showConfirmButton: false,
    });
};

export const getAllPosts = createAsyncThunk("post/getAllPosts", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/all`, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const getPost = createAsyncThunk("post/getPost", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
    }
})
export const getLikedPosts = createAsyncThunk("post/getLikedPosts", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/liked`, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const getFollowingPosts = createAsyncThunk("post/getFollowingPosts", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/following`, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const getUserPosts = createAsyncThunk("post/getUserPosts", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/user/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const createPost = createAsyncThunk("post/createPost", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/createpost`, data, { withCredentials: true })
        showNotification("posted", "success");
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const deletePost = createAsyncThunk("post/deletePost", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/post/${id}`, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
export const createComment = createAsyncThunk("comment/createComment", async ({ id, data }, { rejectWithValue }) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/post/comment/${id}`, data, { withCredentials: true });
        showNotification("commited", "success");
        return res.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
});
export const likeUnLike = createAsyncThunk("post/likeUnLike", async (id, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/post/like/${id}`, {}, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})