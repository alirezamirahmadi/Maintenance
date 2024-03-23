import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { personType } from '../../Types/BasicType'
import apiRequests from "../../Services/AxiosConfig";

const getLogin = createAsyncThunk(
  'Login/GET',
  async () => {
    const result = await apiRequests.get('LoginData');
    return result.data;
  }
)

const postLogin = createAsyncThunk(
  'login/POST',
  async (body: personType) => { await apiRequests.post('LoginData', body) }
)

const logout = createAsyncThunk(
  'login/DELETE',
  async (loginId: string) => { await apiRequests.delete(`LoginData/${loginId}`) }
)

const slice = createSlice({
  name: 'login',
  initialState: { isLogin: false, token: '', userInfo: { username: '', password: '', person: { firstName: '', lastName: '' } } },
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