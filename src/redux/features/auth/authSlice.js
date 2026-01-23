import { createSlice } from "@reduxjs/toolkit";

const getUserFromStorage = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const getTokenFromStorage = () => {
  try {
    return localStorage.getItem("token") || null;
  } catch (error) {
    console.error("Error getting token from localStorage:", error);
    return null;
  }
};

const initialState = {
  user: getUserFromStorage(),
  token: getTokenFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;

      try {
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      } catch (error) {
        console.error("Error saving to localStorage:", error);
      }
    },
    logout: (state) => {
      state.user = null;
      state.token = null;

      try {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      } catch (error) {
        console.error("Error removing from localStorage:", error);
      }
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
