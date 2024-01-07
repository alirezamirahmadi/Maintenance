import { useState, useEffect } from "react";
import { useTheme, Typography, FormControlLabel, Checkbox, } from "@mui/material";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from '../../../Redux/Store';

import { TextFieldBase } from "../../../Components/CustomizedComponent/CutomizedTextField";
import BorderOne from "../../../Components/Global/Border/BorderOne"
import { DeviceType } from "../../../Types/BaseInfoType";
import DeviceTree from "./DeviceTree";

export default function Device(): React.JSX.Element {
  const deviceParams = useParams();
  const devices = useSelector((state: RootState) => state.device);
  const theme = useTheme();
  const [deviceCode, setDeviceCode] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceNo, setDeviceNo] = useState<string>('');
  const [deviceActive, setDeviceActive] = useState<boolean>(false);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>();

  const findDevice = (device: DeviceType, idDevice: string) => {
    if (device.id.toString() === idDevice) { setSelectedDevice(device) }
    device.subDevice?.map(subdevice => findDevice(subdevice, idDevice));
  }

  useEffect(() => {
    findDevice(devices, deviceParams.idDevice ? deviceParams.idDevice : '-1');
    setDeviceCode(selectedDevice ? selectedDevice.deviceCode : '')
    setDeviceName(selectedDevice ? selectedDevice.deviceName : '')
    setDeviceNo(selectedDevice ? selectedDevice.deviceNo : '')
    setDeviceActive(selectedDevice ? selectedDevice.active : false)
  }, [[], deviceParams])

  return (
    <>
      <div className="flex ">
        <BorderOne className="w-64 h-screen overflow-auto mx-2">
          <DeviceTree deviceTree={devices} />
        </BorderOne>
        <div className="w-full">
          <BorderOne title="مشخصات دستگاه" className="w-full">
            <div className="flex justify-between flex-wrap" style={{ fontFamily: theme.typography.fontFamily, color: theme.palette.textColor.main }}>
              <TextFieldBase value={deviceCode} onChange={event => setDeviceCode(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="textsm" color={theme.palette.textColor.main}>کد دستگاه</Typography>} size="small" color="mainColor" />
              <TextFieldBase value={deviceName} onChange={event => setDeviceName(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="textsm" color={theme.palette.textColor.main}>نام دستگاه</Typography>} size="small" color="mainColor" />
              <TextFieldBase value={deviceNo} onChange={event => setDeviceNo(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="textsm" color={theme.palette.textColor.main}>مشخصه فنی</Typography>} size="small" color="mainColor" />
              <FormControlLabel control={<Checkbox checked={deviceActive} onChange={event => setDeviceActive(event.target.checked)} sx={{color:theme.palette.textColor.main, '&.Mui-checked': {color: theme.palette.mainColor.main,}}} />} label={<Typography variant="textsm" color={theme.palette.textColor.main}>فعال</Typography>} />
            </div>
          </BorderOne>
          <BorderOne title="BOM" className="w-full">

          </BorderOne>
        </div>
      </div>
    </>
  )
}
