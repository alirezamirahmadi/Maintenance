import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { NoticeType } from "../../Types/OperationType";
import apiRequests from "../../Services/AxiosConfig";

const getNoticesFromServer = createAsyncThunk(
  'notices/getNoticesFromserver',
  async () => {
    const result = await apiRequests.get('NoticeData');
    return result.data;
  }
)

const slice = createSlice({
  name:'notice',
  initialState:[],
  reducers:{
    addToNotice:(notices:NoticeType[], action:PayloadAction<NoticeType>) => {
      notices.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getNoticesFromServer.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export const {addToNotice} = slice.actions;

export {
  getNoticesFromServer
}