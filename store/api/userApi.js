import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/lib/axios"

export const ProfileFn = createAsyncThunk("user/Profile", async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/profile/${id}`, { withCredentials: true })
    return res.data
})

export const followUnFollow = createAsyncThunk("user/followUnFollow", async (id) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/users/follow/${id}`, {}, { withCredentials: true })
    return res.data
})
export const suggestedUser = createAsyncThunk("user/suggestedUser", async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/users/suggested`, { withCredentials: true })
    return res.data
})
export const editProfile = createAsyncThunk("user/editProfile", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/updateProfile`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
    }
})
export const editPassword = createAsyncThunk("user/editPassword", async (data, { rejectWithValue }) => {
    try {
        const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/users/updatePassword`, data, { withCredentials: true })
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
    }
})



