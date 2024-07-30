import { User, logCall, userLoggedIn, userLoggedOut } from "@boundbybetter/shared";
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: User = {
    userName: 'My Tester',
    userEmail: 'my-tester@boundbybetter.com',
    groups: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(userLoggedIn, (state, action) => {
      logCall('userSlice.userLoggedIn', action.payload);
      state.userName = action.payload.userName;
      state.userEmail = action.payload.userEmail;
      state.groups = action.payload.groups;
    })
    .addCase(userLoggedOut, (state, action) => {
        logCall('userSlice.userLoggedOut', action.payload);
        state.userName = undefined;
        state.userEmail = undefined;
        state.groups = undefined;
      });
  },
});

export const userReducer = userSlice.reducer;

export function selectUser(state: RootState): User {
    return state.user;
}