import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../lib/http";
import { apiUrl } from "../../config";

// Asynchronous thunk to create a new blog post
export const createBlogPost = createAsyncThunk(
    'blogFormPost/createBlogPost',
    async (postData, { rejectWithValue }) => {
        try {
            const response = await http.post(`${apiUrl}/api/v1/blog/create-post`, postData);
            return response.data; // Başarılı ise dönen veriyi al
        } catch (error) {
            return rejectWithValue(error.response.data); // Hata durumunda hatayı döndür
        }
    }
);

// Slice definition
const blogFormPostSlice = createSlice({
    name: "blogFormPost",
    initialState: {
        post: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearPost: (state) => {
            state.post = null; // Gönderi durumunu temizle
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBlogPost.pending, (state) => {
                state.loading = true; // Yükleniyor durumunu ayarla
                state.error = null; // Hata durumunu temizle
            })
            .addCase(createBlogPost.fulfilled, (state, action) => {
                state.loading = false; // Yükleme tamamlandı
                state.post = action.payload; // Gönderiyi güncelle
            })
            .addCase(createBlogPost.rejected, (state, action) => {
                state.loading = false; // Yükleme tamamlandı
                state.error = action.payload; // Hata durumunu güncelle
            });
    },
});

// Export the clearPost action and the reducer
export const { clearPost } = blogFormPostSlice.actions;
export default blogFormPostSlice.reducer;
