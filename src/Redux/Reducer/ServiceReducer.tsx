import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { ServiceType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getService = createAsyncThunk(
  'service/get',
  async () => {
    const result = await apiRequests.get('ServiceData');
    return result.data;
  }
)

const postService = createAsyncThunk(
  'service/post',
  async (body: ServiceType) => { await apiRequests.post('ServiceData', body) }
)

const putService = createAsyncThunk(
  'service/put',
  async (body: ServiceType) => { await apiRequests.put(`ServiceData/${body.id}`, body) }
)

const deleteService = createAsyncThunk(
  'service/delete',
  async (serviceId: number) => { await apiRequests.delete(`ServiceData/${serviceId}`) }
)

const slice = createSlice({
  name: 'service',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getService.fulfilled, (state, action) => action.payload),
      builder.addCase(postService.fulfilled, (state, action) => action.payload),
      builder.addCase(putService.fulfilled, (state, action) => action.payload),
      builder.addCase(deleteService.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export {
  getService,
  postService,
  putService,
  deleteService
}