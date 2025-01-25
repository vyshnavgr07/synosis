import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [], 
  },
  reducers: {
    setUsers: (state, action) => {
      state.list = action.payload;
    },
    addUser: (state, action) => {
      state.list.push(action.payload); 
    },
    editUser: (state, action) => {
      const index = state.list.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = { ...state.list[index], ...action.payload }; 
      }
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(item => item.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, editUser,deleteUser } = userSlice.actions;

export default userSlice.reducer;





















// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'users',
//   initialState: {
//     list: [],
//   },
//   reducers: {
//     setUsers: (state, action) => {
//       state.list = action.payload; 
//     },
//   },
// });

// export const { setUsers } = userSlice.actions;

// export default userSlice.reducer;
