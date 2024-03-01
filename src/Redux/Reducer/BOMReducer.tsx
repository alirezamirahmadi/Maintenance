import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { BOMType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getBOM = createAsyncThunk(
  'BOM/get',
  async () => {
    const result = await apiRequests.get('BOMData');
    return result.data;
  }
)

const postBOM = createAsyncThunk(
  'BOM/post',
  async (body: BOMType) => { await apiRequests.post('BOMData', body) }
)

const putBOM = createAsyncThunk(
  'BOM/put',
  async (body: BOMType) => { await apiRequests.put(`BOMData/${body.id}`, body) }
)

const deleteBOM = createAsyncThunk(
  'BOM/delete',
  async (BOMId: number) => { await apiRequests.delete(`BOMData/${BOMId}`) }
)

const slice = createSlice({
  name: 'BOM',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBOM.fulfilled, (state, action) => action.payload),
      builder.addCase(postBOM.fulfilled, (state, action) => action.payload),
      builder.addCase(putBOM.fulfilled, (state, action) => action.payload),
      builder.addCase(deleteBOM.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export {
  getBOM,
  postBOM,
  putBOM,
  deleteBOM
}