import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginType } from '../../Types/BasicType'
import apiRequests from "../../Services/AxiosConfig";

const getLogin = createAsyncThunk(
  'login/get',
  async (phone: string) => {
    const result = await apiRequests.get(`LoginData?person.phone=${phone}`);
    return result.data;
  }
)

const postLogin = createAsyncThunk(
  'login/post',
  async (body: loginType) => { await apiRequests.post('LoginData', body) }
)

const logout = createAsyncThunk(
  'login/delete',
  async (loginId: string) => { await apiRequests.delete(`LoginData/${loginId}`) }
)

const slice = createSlice({
  name: 'login',
  initialState: [{id:"", isLogin: false, token: '', person: { firstName: '', lastName: '', phone: '' } }],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLogin.fulfilled, (state, action) => action.payload),
      builder.addCase(postLogin.fulfilled, (state, action) => action.payload),
      builder.addCase(logout.fulfilled, (state, action) => action.payload)
  }
})


export default slice.reducer;

export {
  getLogin,
  postLogin,
  logout
}