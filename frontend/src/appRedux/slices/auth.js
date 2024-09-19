import { createSlice } from "@reduxjs/toolkit";

//step 1: inital state
const initialState = {
  signupData: null,
  loading: false,
  token: localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null,
};

// step 2:create slice
const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    setLoading(state, value) {
      state.loading = value.payload;
    },
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

//step 3: export the action and the reducers

export const { setSignupData, setLoading, setToken } = authSlice.actions;
export default authSlice.reducer;
