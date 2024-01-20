import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { ActionType } from "../../Types/OperationType";

const slice = createSlice({
  name: 'action',
  initialState: [],
  reducers: {
    addToAction: (actions: ActionType[], action: PayloadAction<ActionType>) => {
      actions.push(action.payload);
    }
  }
})

export default slice.reducer;

export const {addToAction} = slice.actions;