import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Login, Register, MyProfile, Logout, deleteUserAccount } from "../utils/path";

export const STATUES = Object.freeze({
  IDEL: "idel",
  ERROR: "error",
  LOADING: "loading",
});

const userSlice = createSlice({
  name: "user",
  initialState: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLoginData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = STATUES.IDEL;
        if (getCookie("token")) {
          state.isAuth = true;
        }
        else {
          state.isAuth = false;
        }
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.status = STATUES.ERROR;
        state.error = action.payload;
        state.isAuth = false;

      })




      .addCase(postRegisterData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(postRegisterData.fulfilled, (state, action) => {
        state.user = action.payload;
        if (getCookie("token")) {
          state.isAuth = true;
        }
        else {
          state.isAuth = false;
        }
        state.status = STATUES.IDEL;
      })
      .addCase(postRegisterData.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuth = false;
        state.status = STATUES.ERROR;
      })





      .addCase(loadUserData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(loadUserData.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.user === undefined) {
          state.isAuth = false;
        }
        else {

          state.isAuth = true;
        }
        state.status = STATUES.IDEL;
      })
      .addCase(loadUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuth = false;
        state.status = STATUES.ERROR;
      })


      .addCase(logoutUserData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(logoutUserData.fulfilled, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.status = STATUES.IDEL;
      })
      .addCase(logoutUserData.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuth = true;
        state.status = STATUES.ERROR;
      })

      .addCase(deleteUserAccountData.pending, (state, action) => {
        state.status = STATUES.LOADING;
      })
      .addCase(deleteUserAccountData.fulfilled, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.status = STATUES.IDEL;
      })
      .addCase(deleteUserAccountData.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuth = true;
        state.status = STATUES.ERROR;
      });

  },
});

export default userSlice.reducer;


export function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}
export const postLoginData = createAsyncThunk(
  "login/post",
  async (logindata) => {
    try {
      const { email, password } = logindata;
      const loginInput = { email, password };
      let response = await fetch(Login, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(loginInput),
        headers: {
          withCredentials: true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      return data.user;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  }
);

export const postRegisterData = createAsyncThunk(
  "register/post",
  async ({ name, email, password, avatar }) => {
    try {
      const registerInput = { name, email, password, avatar };
      let response = await fetch(Register, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(registerInput),
        headers: {
          withCredentials: true,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      let data = await response.json();
      return data.user;
    } catch (error) {
      console.log(error);
    }
  }
);

export const loadUserData = createAsyncThunk("loadUser/get", async () => {
  try {
    const response = await fetch(MyProfile, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.log(error);
  }
});


export const logoutUserData = createAsyncThunk("logout/get", async () => {
  try {
    const respose = await fetch(Logout, {
      method: "GET",
      credentials: "include"
    });

    const data = await respose.json();
    return data;
  } catch (error) {
    console.log(error);
  }
});



export const deleteUserAccountData = createAsyncThunk("delete/user/account", async () => {
  try {

    const response = await fetch(deleteUserAccount, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await response.json();
    return data.message;
  } catch (error) {
    console.log(error);
  }
});