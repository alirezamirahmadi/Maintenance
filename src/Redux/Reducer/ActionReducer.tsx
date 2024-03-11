import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { ActionType } from "../../Types/OperationType";
import apiRequests from "../../Services/AxiosConfig";

const getAction = createAsyncThunk(
  'action/get',
  async () => {
    const result = await apiRequests.get('ActionData');
    return result.data;
  }
)

const postAction = createAsyncThunk(
  'action/post',
  async (body: ActionType) => { await apiRequests.post('ActionData', body) }
)

const putAction = createAsyncThunk(
  'action/put',
  async (body: ActionType) => { await apiRequests.put(`ActionData/${body.id}`, body) }
)

const deleteAction = createAsyncThunk(
  'action/delete',
  async (actionId: number) => { await apiRequests.delete(`ActionData/${actionId}`) }
)

const slice = createSlice({
  name: 'action',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAction.fulfilled, (state, action) => action.payload),
      builder.addCase(postAction.fulfilled, (state, action) => action.payload),
      builder.addCase(putAction.fulfilled, (state, action) => action.payload),
      builder.addCase(deleteAction.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export {
  getAction,
  postAction,
  putAction,
  deleteAction
}