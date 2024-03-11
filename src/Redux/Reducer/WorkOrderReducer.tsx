import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { WorkOrderType } from "../../Types/OperationType";
import apiRequests from "../../Services/AxiosConfig";

const getWorkOrder = createAsyncThunk(
  'workOrder/get',
  async () => {
    const result = await apiRequests.get('WorkOrderData');
    return result.data;
  }
)

const postWorkOrder = createAsyncThunk(
  'workOrder/post',
  async (body: WorkOrderType) => { await apiRequests.post('WorkOrderData', body) }
)

const putWorkOrder = createAsyncThunk(
  'workOrder/put',
  async (body: WorkOrderType) => { await apiRequests.put(`WorkOrderData/${body.id}`, body) }
)

const deleteWorkOrder = createAsyncThunk(
  'workOrder/delete',
  async (workOrderId: number) => { await apiRequests.delete(`WorkOrderData/${workOrderId}`) }
)

const slice = createSlice({
  name: 'workorder',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWorkOrder.fulfilled, (state, action) => action.payload),
      builder.addCase(postWorkOrder.fulfilled, (state, action) => action.payload),
      builder.addCase(putWorkOrder.fulfilled, (state, action) => action.payload),
      builder.addCase(deleteWorkOrder.fulfilled, (state, action) => action.payload)
  }
})


export default slice.reducer;

export {
  getWorkOrder,
  postWorkOrder,
  putWorkOrder,
  deleteWorkOrder
}