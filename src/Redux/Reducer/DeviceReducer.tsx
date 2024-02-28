import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

import { DeviceType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getDevicesFromServer = createAsyncThunk(
  'devices/getDevicesFromserver',
  async () => {
    const result = await apiRequests.get('DeviceData');
    return result.data;
  }
)

const slice = createSlice({
  name: 'device',
  initialState: { id: 0, deviceName: '', deviceCode: '', deviceNo: '', active: false },
  reducers: {
    addDevice: (devices: DeviceType, action: PayloadAction<DeviceType>) => {
      devices.id = action.payload.id;
      devices.deviceName = action.payload.deviceName;
      devices.deviceCode = action.payload.deviceCode;
      devices.deviceNo = action.payload.deviceNo;
      devices.active = action.payload.active;
      devices.subDevice = action.payload.subDevice;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getDevicesFromServer.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export const { addDevice } = slice.actions;

export {
  getDevicesFromServer
}

