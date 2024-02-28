import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { ProblemType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getProblemsFromServer = createAsyncThunk(
  'problems/getProblemsFromserver',
  async () => {
    const result = await apiRequests.get('ProblemData');
    return result.data;
  }
)

const slice = createSlice({
  name:'problem',
  initialState:[],
  reducers:{
    addToProblem:(problems:ProblemType[], action:PayloadAction<ProblemType>)=>{
      problems.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getProblemsFromServer.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export const {addToProblem} = slice.actions;

export {
  getProblemsFromServer
}