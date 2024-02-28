import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { WorkOrderType } from "../../Types/OperationType";
import apiRequests from "../../Services/AxiosConfig";

const getWorkOrdersFromServer = createAsyncThunk(
  'workOrders/getWorkOrdersFromserver',
  async () => {
    const result = await apiRequests.get('WorkOrderData');
    return result.data;
  }
)

const slice = createSlice({
  name:'workorder',
  initialState:[],
  reducers:{
    addToWorkOrder:(workorders:WorkOrderType[], action:PayloadAction<WorkOrderType>) => {
      workorders.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkOrdersFromServer.fulfilled, (state, action) => action.payload)
  }
})


export default slice.reducer;

export const {addToWorkOrder} = slice.actions;

export {
  getWorkOrdersFromServer
}