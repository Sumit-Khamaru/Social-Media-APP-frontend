import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUES } from "./userSlice";
import { getAllUser, host } from "../utils/path";


const getAllUserSlice = createSlice({
  name: "allusers",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(getAllUsersData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(getAllUsersData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = STATUES.ERROR;
      })

      .addCase(searchUsersData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(searchUsersData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = STATUES.IDEL;
      })
      .addCase(searchUsersData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = STATUES.ERROR;
      })
  }
})


export default getAllUserSlice.reducer;

export const getAllUsersData = createAsyncThunk("allUsers/get", async () => {
  try {
    const response = await fetch(getAllUser, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
  }
});


export const searchUsersData = createAsyncThunk("search/user/get", async ({name = ""}) => {
  try {
    const response = await fetch(`${host}/api/v1/search/users?name=${name}`, {
      method: "GET",
      credentials: "include",
    });

    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
  }
});