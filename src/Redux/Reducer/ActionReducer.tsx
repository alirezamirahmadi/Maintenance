import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { ActionType } from "../../Types/OperationType";
import apiRequests from "../../Services/AxiosConfig";

const getActionsFromServer = createAsyncThunk(
  'actions/getActionsFromserver',
  async () => {
    const result = await apiRequests.get('ActionData');
    return result.data;
  }
)

const slice = createSlice({
  name: 'action',
  initialState: [],
  reducers: {
    addToAction: (actions: ActionType[], action: PayloadAction<ActionType>) => {
      actions.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getActionsFromServer.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export const {addToAction} = slice.actions;

export {
  getActionsFromServer
}