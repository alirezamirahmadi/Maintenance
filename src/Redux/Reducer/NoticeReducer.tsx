import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { NoticeType } from "../../Types/OperationType";
import apiRequests from "../../Services/AxiosConfig";

const getNotice = createAsyncThunk(
  'notice/get',
  async () => {
    const result = await apiRequests.get('NoticeData');
    return result.data;
  }
)

const postNotice = createAsyncThunk(
  'notice/post',
  async (body: NoticeType) => { await apiRequests.post('NoticeData', body) }
)

const putNotice = createAsyncThunk(
  'notice/put',
  async (body: NoticeType) => { await apiRequests.put(`NoticeData/${body.id}`, body) }
)

const deleteNotice = createAsyncThunk(
  'notice/delete',
  async (noticeId: number) => { await apiRequests.delete(`NoticeData/${noticeId}`) }
)

const slice = createSlice({
  name: 'notice',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotice.fulfilled, (state, action) => action.payload),
    builder.addCase(postNotice.fulfilled, (state, action) => action.payload),
    builder.addCase(putNotice.fulfilled, (state, action) => action.payload),
    builder.addCase(deleteNotice.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export {
  getNotice,
  postNotice,
  putNotice,
  deleteNotice
}