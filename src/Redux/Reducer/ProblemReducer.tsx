import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import type { ProblemType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getProblem = createAsyncThunk(
  'problem/get',
  async () => {
    const result = await apiRequests.get('ProblemData');
    return result.data;
  }
)

const postProblem = createAsyncThunk(
  'problem/post',
  async (body: ProblemType) => { await apiRequests.post('ProblemData', body) }
)

const putProblem = createAsyncThunk(
  'problem/put',
  async (body: ProblemType) => { await apiRequests.put(`ProblemData/${body.id}`, body) }
)

const deleteProblem = createAsyncThunk(
  'problem/delete',
  async (problemId: number) => { await apiRequests.delete(`ProblemData/${problemId}`) }
)

const slice = createSlice({
  name: 'problem',
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProblem.fulfilled, (state, action) => action.payload),
      builder.addCase(postProblem.fulfilled, (state, action) => action.payload),
      builder.addCase(putProblem.fulfilled, (state, action) => action.payload),
      builder.addCase(deleteProblem.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export {
  getProblem,
  postProblem,
  putProblem,
  deleteProblem
}