import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../../types/user-type";
import { RootState } from "../store";

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state = initialState;
      return state;
    },
    setUser: (state) => {
      state.isAuthenticated = true;
      return state;
    },
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;

export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
