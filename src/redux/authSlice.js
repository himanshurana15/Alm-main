import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isSuperUser: false,
  },
  reducers: {
    toggleSuperUser: (state) => {
      state.isSuperUser = !state.isSuperUser;
    },
  },
});

export const { toggleSuperUser } = authSlice.actions;
export default authSlice.reducer;
