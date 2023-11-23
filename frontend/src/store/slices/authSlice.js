import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  likedProfiles: [],
  role: "User",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload.isAuth;
      state.user = action.payload.user;
    },
    setLikedProfiles: (state, action) => {
      state.likedProfiles = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAuth, setLikedProfiles } = authSlice.actions;

export default authSlice.reducer;
