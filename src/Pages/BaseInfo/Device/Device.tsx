import { useState, useEffect } from "react";
import { Typography, FormControlLabel, Checkbox, TextField } from "@mui/material";
import { DataGrid } from '@mui/x-data-grid';
import MUIDataTable from "mui-datatables";
import { useParams } from "react-router";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import type { RootState } from '../../../Redux/Store';

import BorderOne from "../../../Components/Global/Border/BorderOne"
import { BOMType, DeviceType } from "../../../Types/BaseInfoType";
import DeviceTree from "./DeviceTree";
import { BOMTableColumns } from "../../../Utils/Datas";

const muiCache = createCache({
  key: "mui-datatables",
  prepend: true
});

export default function Device(): React.JSX.Element {
  const deviceParams = useParams();
  const devices = useSelector((state: RootState) => state.device);
  const BOMs = useSelector((state: RootState) => state.BOM);
  const [deviceCode, setDeviceCode] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceNo, setDeviceNo] = useState<string>('');
  const [deviceActive, setDeviceActive] = useState<boolean>(false);
  const [deviceBOM, setDeviceBOM] = useState<BOMType[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>();

  const findDevice = (device: DeviceType, idDevice: string) => {
    if (device.id.toString() === idDevice) { setSelectedDevice(device) }
    device.subDevice?.map(subdevice => findDevice(subdevice, idDevice));
  }

  useEffect(() => {
    findDevice(devices, deviceParams.idDevice ? deviceParams.idDevice : '-1');
  }, [deviceParams])
  
  useEffect(() => {
    setDeviceCode(selectedDevice ? selectedDevice.deviceCode : '')
    setDeviceName(selectedDevice ? selectedDevice.deviceName : '')
    setDeviceNo(selectedDevice ? selectedDevice.deviceNo : '')
    setDeviceActive(selectedDevice ? selectedDevice.active : false)

    let tempArray = BOMs.filter((bom: BOMType) => bom.idDevice.toString() === deviceParams.idDevice);
    setDeviceBOM(tempArray ? [...tempArray] : []);

  }, [selectedDevice])

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap">
        <BorderOne className="w-64 h-screen overflow-auto mx-2">
          <DeviceTree deviceTree={devices} />
        </BorderOne>
        <div className="w-full">
          <BorderOne title="مشخصات دستگاه" className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <TextField value={deviceCode} onChange={event => setDeviceCode(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="body2" >کد دستگاه</Typography>} size="small" />
              <TextField value={deviceName} onChange={event => setDeviceName(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="body2" >نام دستگاه</Typography>} size="small" />
              <TextField value={deviceNo} onChange={event => setDeviceNo(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="body2" >مشخصه فنی</Typography>} size="small" />
              <FormControlLabel control={<Checkbox checked={deviceActive} onChange={event => setDeviceActive(event.target.checked)} />} label={<Typography variant="body2" >فعال</Typography>} />
            </div>
          </BorderOne>
          <BorderOne title="BOM">
            <CacheProvider value={muiCache}>

              <MUIDataTable data={deviceBOM} columns={BOMTableColumns} title='BOM' options={{ responsive: 'vertical' }}
              // pageSizeOptions={[5, 10]} checkboxSelection
              // initialState={{ pagination: { paginationModel: { page: 0, pageSize: 5 } } }}
              />
            </CacheProvider>
          </BorderOne>
        </div>
      </div>
    </>
  )
}
