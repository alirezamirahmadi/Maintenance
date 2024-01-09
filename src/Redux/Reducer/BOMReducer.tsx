import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BOMType } from "../../Types/BaseInfoType";

const slice = createSlice({
  name:'BOM',
  initialState:[],
  reducers:{
    addBOM:(BOMs: BOMType[], action: PayloadAction<BOMType>) => {
      BOMs.push(action.payload);
    }
  }
})

export default slice.reducer;

export const {addBOM} = slice.actions;