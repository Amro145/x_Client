import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../src/lib/axios"
import Swal from "sweetalert2";

export const notification = createAsyncThunk("notification/notification", async () => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/notification`, { withCredentials: true })
    return res.data
})

export const deleteNotifications = createAsyncThunk("notification/deleteNotifications", async () => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/notification`, { withCredentials: true })
    return res.data
})
export const deleteOneNotifications = createAsyncThunk("notification/deleteOneNotifications", async (id) => {
    const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/notification/${id}`, { withCredentials: true })
    return res.data
})
