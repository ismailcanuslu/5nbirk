import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../lib/http";
import { apiUrl } from "../../config";
// Asynchronous thunk to search users
export const searchUsers = createAsyncThunk(
    'userSearch/searchUsers',
    async (query, { rejectWithValue }) => {
        try {
            // JSON formatında veri gönderimi
            const response = await http.post(`${apiUrl}/api/v1/search/users`, { query });
            return response.data; // Başarılı ise dönen veriyi al
        } catch (error) {
            return rejectWithValue(error.response.data); // Hata durumunda hatayı döndür
        }
    }
);

// Slice definition
const userSearchSlice = createSlice({
    name: "userSearch",
    initialState: {
        users: [], // Kullanıcı listesi
        loading: false, // Yüklenme durumu
        error: null, // Hata durumu
    },
    reducers: {
        clearUsers: (state) => {
            state.users = []; // Kullanıcı listesini temizle
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchUsers.pending, (state) => {
                state.loading = true; // Yükleniyor durumunu ayarla
                state.error = null; // Hata durumunu temizle
            })
            .addCase(searchUsers.fulfilled, (state, action) => {
                state.loading = false; // Yükleme tamamlandı
                state.users = action.payload; // Kullanıcı listesini güncelle
            })
            .addCase(searchUsers.rejected, (state, action) => {
                state.loading = false; // Yükleme tamamlandı
                state.error = action.payload; // Hata durumunu güncelle
            });
    },
});

// Export the clearUsers action and the reducer
export const { clearUsers } = userSearchSlice.actions;
export default userSearchSlice.reducer;
