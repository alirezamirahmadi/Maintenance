import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { WorkOrderType } from "../../Types/OperationType";

const slice = createSlice({
  name:'workorder',
  initialState:[],
  reducers:{
    addToWorkOrder:(workorders:WorkOrderType[], action:PayloadAction<WorkOrderType>) => {
      workorders.push(action.payload);
    }
  }
})


export default slice.reducer;

export const {addToWorkOrder} = slice.actions;