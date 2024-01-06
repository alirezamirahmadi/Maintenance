import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { loginType } from '../../Types/BasicType'

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
  }
})


export default slice.reducer;

export const {login, logout} = slice.actions;