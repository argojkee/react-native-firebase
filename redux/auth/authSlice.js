import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  userEmail: null,
  userAvatar: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      userEmail: payload.userEmail,
      userAvatar: payload.userAvatar,
    }),

    updateIsAuth: (state, { payload }) => ({
      ...state,
      isAuth: payload,
    }),
    authSignOutUserAction: () => ({ ...initialState }),
  },
});

export const {
  updateUserProfile,

  updateIsAuth,
  authSignOutUserAction,
} = authSlice.actions;

export default authSlice.reducer;
