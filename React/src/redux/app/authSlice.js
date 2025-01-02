import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { usernameUpdate } from "./usernameUpdateSlice"; // Kullanıcı adı güncelleme eylemi

const initialState = {
    id: 0,
    username: '',
    email: '',
};

// Kullanıcı bilgilerini çerezden yükle
const loadAuthState = () => {
    const auth = Cookies.get('auth');
    return auth ? JSON.parse(auth) : {};
};

const authSlice = createSlice({
    name: "auth",
    initialState: { ...initialState, ...loadAuthState() },
    reducers: {
        loginSuccess: (state, action) => {
            // Kullanıcı bilgilerini güncelle
            state.id = action.payload.user.id;
            state.username = action.payload.user.username;
            state.email = action.payload.user.email;

            // Kullanıcı bilgilerini çerezde sakla
            const expireDays = action.payload.rememberMe ? 7 : 2; // "Beni Hatırla" seçeneğine göre süre ayarla
            Cookies.set('auth', JSON.stringify(action.payload.user), { expires: expireDays });

            if (action.payload.rememberMe) {
                localStorage.setItem("rememberedEmail", action.payload.user.email);
            } else {
                localStorage.removeItem("rememberedEmail");
            }
        },
        logoutSuccess: (state) => {
            // Kullanıcı bilgilerini sıfırla
            state.id = 0;
            state.username = '';
            state.email = '';

            // Çerezi temizle
            Cookies.remove('auth');
        },
        userUpdateSuccess: (state, action) => {
            // Kullanıcı adını güncelle
            state.username = action.payload.username;

            // Güncellenen kullanıcı adını çerezde sakla
            const currentAuth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : {};
            Cookies.set('auth', JSON.stringify({ ...currentAuth, username: action.payload.username }), { expires: 7 });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(usernameUpdate.fulfilled, (state, action) => {
                // Kullanıcı adını güncelle
                state.username = action.payload.username;

                // Güncellenen kullanıcı adını çerezde sakla
                const currentAuth = Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : {};
                Cookies.set('auth', JSON.stringify({ ...currentAuth, username: action.payload.username }), { expires: 7 });
            });
    }
});

export const { loginSuccess, logoutSuccess, userUpdateSuccess } = authSlice.actions;

export default authSlice.reducer;
