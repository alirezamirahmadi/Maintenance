import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DeviceType } from "../../Types/BaseInfoType";

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
  }
})

export default slice.reducer;

export const { addDevice } = slice.actions;

