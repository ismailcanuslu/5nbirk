import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import http from "../../lib/http";
import { loadAuthState } from "../../shared/state/storage";
import { apiUrl } from "../../config";


const initialState = {
    username: loadAuthState.username,
    newUsername: loadAuthState.username,
    apiProgress: false,
    successMessage: null,
    errors: {},
    generalError: null,
}

export const usernameUpdate = createAsyncThunk('/users/usernameUpdate',
    async ({ id, body }, { rejectWithValue }) => {
        try {
            const response = await http.put(`${apiUrl}/api/v1/users/${id}`, body);

            console.log("Success Response:", response.data);
            localStorage.setItem('auth', JSON.stringify({
                ...JSON.parse(localStorage.getItem('auth')),
                username: response.data.username,
            }));



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



export const usernameUpdateSlice = createSlice({
    name: "usernameUpdate",
    initialState,
    reducers: {
        clearErrors: (state, action) => {
            state.errors[action.payload] = undefined;
        },
        resetState: (state) => {
            state.successMessage = null,
                state.generalError = null,
                state.apiProgress = false,
                state.errors = {}
        },
        updateField: (state, action) => {
            state[action.payload.field] = action.payload.value;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(usernameUpdate.pending, (state) => {
                state.apiProgress = true;
                state.successMessage = null;
                state.generalError = null;
            })
            .addCase(usernameUpdate.fulfilled, (state, action) => {
                console.log("Fulfilled Action Payload:", action.payload);
                state.username = action.payload.username;
                state.apiProgress = false;
                state.successMessage = action.payload.message;
                state.errors.username = undefined;

            })
            .addCase(usernameUpdate.rejected, (state, action) => {
                console.log("Rejected Action Payload:", action.payload);
                state.apiProgress = false;
                if (action.payload?.validationErrors) {
                    state.errors = action.payload.validationErrors;
                }
                else {
                    state.generalError = action.payload?.message || 'Something went wrong';
                }

            })
    }

})

export const { clearErrors, resetState, updateField } = usernameUpdateSlice.actions;

export default usernameUpdateSlice.reducer;