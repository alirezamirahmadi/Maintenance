import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { ServiceType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getServicesFromServer = createAsyncThunk(
  'services/getServicesFromserver',
  async () => {
    const result = await apiRequests.get('ServiceData');
    return result.data;
  }
)

const slice = createSlice({
  name: 'service',
  initialState: [],
  reducers: {
    addToService: (services: ServiceType[], action: PayloadAction<ServiceType>) => {
      services.push(action.payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getServicesFromServer.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export const {addToService} = slice.actions;

export {
  getServicesFromServer
}