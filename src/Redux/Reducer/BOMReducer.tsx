import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { BOMType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getBOMFromServer = createAsyncThunk(
  'BOM/getBOMFromserver',
  async () => {
    const result = await apiRequests.get('BOMData');
    return result.data;
  }
)
const slice = createSlice({
  name:'BOM',
  initialState:[],
  reducers:{
    addBOM:(BOMs: BOMType[], action: PayloadAction<BOMType>) => {
      BOMs.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getBOMFromServer.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export const {addBOM} = slice.actions;

export {
  getBOMFromServer
}