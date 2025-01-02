import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import signReducer from "./signUpSlice";
import usernameReducer from "./usernameUpdateSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import blogPostReducer from "./blogPostSlice";
import blogPostFormReducer from "./blogPostFormSlice";
import searchUsersReducer from "./searchUsersSlice";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        signUp: signReducer,
        usernameUpdate: usernameReducer,
        blogPost: blogPostReducer,
        blogForm: blogPostFormReducer,
        searchUsers: searchUsersReducer
    }
});

export const persistor = persistStore(store);
