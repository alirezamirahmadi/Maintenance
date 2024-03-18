import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'mode',
  initialState: 'light',
  reducers: {
    change: (mode: string, action: PayloadAction<'light' | 'dark'>) => {
      return mode = action.payload;
    }
  }
})

export default slice.reducer;

export const { change } = slice.actions