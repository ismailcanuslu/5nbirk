import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../lib/http";
import { apiUrl } from "../../config";
const initialState = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    name: '',
    lastname: '',
    country: '',
    language: '',
    apiProgress: false,
    successMessage: null,
    errors: {},
    generalError: null,
}

export const signUp = createAsyncThunk('/auth/signUp',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await http.post(`${apiUrl}/api/v1/users`, userData);
            console.log("Success Response:", response.data);
            return response.data;
        } catch (error) {
            console.log("Error Response:", error.response);
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data);
            }
            return rejectWithValue({ message: "Something went wrong" });
        }
    }
)

export const signUpSlice = createSlice({
    name: "signUp",
    initialState,
    reducers: {
        clearErrors: (state, action) => {
            state.errors[action.payload] = undefined;
        },
        resetState: (state) => {
            state.successMessage = null;
            state.generalError = null;
            state.apiProgress = false;
            state.errors = {};
            // Reset country and language as well if needed
            state.country = '';
            state.language = '';
        },
        updateField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUp.pending, (state) => {
                state.apiProgress = true;
                state.successMessage = null;
                state.generalError = null;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                console.log("Fulfilled Action Payload:", action.payload);
                state.apiProgress = false;
                state.successMessage = action.payload.message;
                // Eğer gerekli ise burada country ve language'ı da işleyebilirsin
                // Örneğin:
                // state.country = action.payload.country;
                // state.language = action.payload.language;
            })
            .addCase(signUp.rejected, (state, action) => {
                console.log("Rejected Action Payload:", action.payload);
                state.apiProgress = false;
                if (action.payload?.validationErrors) {
                    state.errors = action.payload.validationErrors;
                } else {
                    state.generalError = action.payload?.message || 'Something went wrong';
                }
            });
    }
})

export const { clearErrors, resetState, updateField } = signUpSlice.actions;

export default signUpSlice.reducer;
