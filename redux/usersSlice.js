import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userEmail: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
  },
});

export const { getUserEmail } = usersSlice.actions;

export default usersSlice.reducer;
