import { createSlice } from "@reduxjs/toolkit";
import { haveAccessToken } from "util/authUtil";

const initialState = {
  loggedIn: haveAccessToken(),
  check: 0,
  loginEmail: "",
};

const authInfoSlice = createSlice({
  name: "authInfo",
  initialState,
  reducers: {
    resetAuthStore: () => initialState,
    syncAuth(state = initialState) {
      state.loggedIn = haveAccessToken();
      state.check = state.check + 1;
    },
    setLoginEmail(state = initialState, action) {
      state.loginEmail = action.payload;
    },
  },
});

export const { syncAuth, resetAuthStore, setLoginEmail } =
  authInfoSlice.actions;
export default authInfoSlice.reducer;
