import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

import { ServiceType } from "../../Types/BaseInfoType";

const slice = createSlice({
  name: 'service',
  initialState: [],
  reducers: {
    addToService: (services: ServiceType[], action: PayloadAction<ServiceType>) => {
      services.push(action.payload);
    }
  }
})

export default slice.reducer;

export const {addToService} = slice.actions;