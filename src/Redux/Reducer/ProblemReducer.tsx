import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { ProblemType } from "../../Types/BaseInfoType";

const slice = createSlice({
  name:'problem',
  initialState:[],
  reducers:{
    addToProblem:(problems:ProblemType[], action:PayloadAction<ProblemType>)=>{
      problems.push(action.payload);
    }
  }
})

export default slice.reducer;

export const {addToProblem} = slice.actions;