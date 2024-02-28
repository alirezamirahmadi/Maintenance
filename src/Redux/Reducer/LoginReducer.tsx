import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { loginType } from '../../Types/BasicType'
import apiRequests from "../../Services/AxiosConfig";

const getLoginFromServer = createAsyncThunk(
  'Login/getLoginFromserver',
  async () => {
    const result = await apiRequests.get('LoginData');
    return result.data;
  }
)

const slice = createSlice({
  name: 'login',
  initialState: {isLogin:false, token:'', userInfo:{username:'', password:'', person:{firstName:'', lastName:''}}},
  reducers: {
    login: (user: loginType, action: PayloadAction<loginType>) => {
      user.isLogin = true;
      user.token = action.payload.token;
      user.account = action.payload.account;
    },
    logout: (user: loginType) => {
      user.isLogin = false;
      user.token = '';
      user.account = undefined
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoginFromServer.fulfilled, (state, action) => action.payload)
  }
})


export default slice.reducer;

export const {login, logout} = slice.actions;

export {
  getLoginFromServer
}