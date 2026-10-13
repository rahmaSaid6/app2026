import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../Exampledta";
const initialState ={value :UserData}
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers:{
    addUser: (state, action) =>
      {
      state.value.push(action.payload);
    },
    deletUser:(state,action)=>
      {
      state.value = state.value.filter((user)=>user.email !== action.payload);
    },
     UpdateUser:(state,action)=>
      {state.value.map((user)=> {
      if (user.email === action.payload.email)
      {
        user.name = action.payload.name;
        user.password = action.payload.password;
      }});
    },
  },
});



export const {addUser, deletUser,UpdateUser}=userSlice.actions;
export default userSlice.reducer;