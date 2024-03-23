import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import apiRequests from "../../Services/AxiosConfig";

const getAccount = createAsyncThunk(
  'account/get',
  async (username: string) => { 
    const result = await apiRequests.get(`AccountData?username=${username}`);
    return result.data;
  }
)

const slice = createSlice({
  name: 'person',
  initialState: [{ id: undefined, username: undefined, password: undefined, person: { firstName: "", lastName: "", phone: "", email: "" } }],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAccount.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export {
  getAccount
}