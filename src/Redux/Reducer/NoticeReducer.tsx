import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { NoticeType } from "../../Types/OperationType";

const slice = createSlice({
  name:'notice',
  initialState:[],
  reducers:{
    addToNotice:(notices:NoticeType[], action:PayloadAction<NoticeType>) => {
      notices.push(action.payload);
    }
  }
})

export default slice.reducer;

export const {addToNotice} = slice.actions;