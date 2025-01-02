import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../lib/http";

import { apiUrl } from "../../config";

export const fetchLatestPosts = createAsyncThunk('blogPost/fetchLatestPosts', async ({ page = 1, size = 6 }, { rejectWithValue }) => {
    try {
        const response = await http.get(`${apiUrl}/api/v1/blog/latest-posts?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchBlogPostById = createAsyncThunk('blogPost/fetchPostById', async (id, { rejectWithValue }) => {
    try {
        const response = await http.get(`${apiUrl}/api/v1/blog/${id}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const fetchBlogPostForHome = createAsyncThunk('blogPost/fetchPostByIdForHome', async (_, { rejectWithValue }) => {
    try {
        const response = await http.get(`${apiUrl}/api/v1/blog/latest-posts-home`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const postSlice = createSlice({
    name: "blogPost",
    initialState: {
        posts: [],
        post: null,
        homePosts: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearPost: (state) => {
            state.post = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLatestPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLatestPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.content || []; // 'content' kullanarak güncelle
                console.log('Fetched posts:', state.posts);
            })
            .addCase(fetchLatestPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.homePosts = [];
            })
            .addCase(fetchBlogPostById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPostById.fulfilled, (state, action) => {
                state.loading = false;
                state.post = action.payload;
            })
            .addCase(fetchBlogPostById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBlogPostForHome.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBlogPostForHome.fulfilled, (state, action) => {
                state.loading = false;
                state.homePosts = action.payload;
            })
            .addCase(fetchBlogPostForHome.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            ;
    },
});

export const { clearPost } = postSlice.actions;
export default postSlice.reducer;
