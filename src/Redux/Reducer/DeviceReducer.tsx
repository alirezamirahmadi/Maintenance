import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { DeviceType } from "../../Types/BaseInfoType";
import apiRequests from "../../Services/AxiosConfig";

const getDevice = createAsyncThunk(
  'device/get',
  async () => {
    const result = await apiRequests.get('DeviceData');
    return result.data;
  }
)

const postDevice = createAsyncThunk(
  'device/post',
  async (body: DeviceType) => { await apiRequests.post('DeviceData', body) }
)

const putDevice = createAsyncThunk(
  'device/put',
  async (body: DeviceType) => { await apiRequests.put(`DeviceData/${body.id}`, body) }
)

const deleteDevice = createAsyncThunk(
  'device/delete',
  async (deviceId: number) => { await apiRequests.delete(`DeviceData/${deviceId}`) }
)

const slice = createSlice({
  name: 'device',
  initialState: { id: 0, deviceName: '', deviceCode: '', deviceNo: '', active: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDevice.fulfilled, (state, action) => action.payload),
      builder.addCase(postDevice.fulfilled, (state, action) => action.payload),
      builder.addCase(putDevice.fulfilled, (state, action) => action.payload),
      builder.addCase(deleteDevice.fulfilled, (state, action) => action.payload)
  }
})

export default slice.reducer;

export {
  getDevice,
  postDevice,
  putDevice,
  deleteDevice
}

