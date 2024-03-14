import { useState, useEffect } from "react";
import { Typography, FormControlLabel, Checkbox, TextField } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useParams, useNavigate } from "react-router";
import { CacheProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from '../../../Redux/Store';

import { getDevice, postDevice, putDevice, deleteDevice } from "../../../Redux/Reducer/DeviceReducer";
import { getBOM } from "../../../Redux/Reducer/BOMReducer";
import BorderOne from "../../../Components/Global/Border/BorderOne"
import type { BOMType, DeviceType } from "../../../Types/BaseInfoType";
import DeviceTree from "./DeviceTree";
import { BOMTableColumns } from "../../../Utils/Datas";
import { cacheDataTable } from "../../../Theme";
import { DataTableOptions } from "../../../Utils/Datas";
import MutationMenu from "../../../Components/Global/mutationMenu/MutationMenu";
import Loading from "../../../Components/Global/loading/Loading";

export default function Device(): React.JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const deviceParams = useParams();
  const dispatch: AppDispatch = useDispatch();
  const devices = useSelector((state: RootState) => state.device);
  const BOMs = useSelector((state: RootState) => state.BOM);
  const [deviceCode, setDeviceCode] = useState<string>('');
  const [deviceName, setDeviceName] = useState<string>('');
  const [deviceNo, setDeviceNo] = useState<string>('');
  const [deviceActive, setDeviceActive] = useState<boolean>(false);
  const [deviceBOM, setDeviceBOM] = useState<BOMType[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>();

  const findDevice = (device: DeviceType, idDevice: string) => {
    if (device.id?.toString() === idDevice) { setSelectedDevice(device) }
    device.subDevice?.map(subdevice => findDevice(subdevice, idDevice));
  }

  const saveDevice = () => {
    const body: DeviceType = { deviceCode, deviceName, deviceNo, active: deviceActive };
    dispatch(selectedDevice ? putDevice({ id: selectedDevice.id, ...body }) : postDevice({ ...body }))
  }

  const handleMutateAction = (action: string) => {
    switch (action) {
      case 'new':
        navigate('/device')
        break;
      case 'save':
        saveDevice();
        break;
      case 'delete':
        dispatch(deleteDevice(selectedDevice?.id ? selectedDevice?.id : 0))
        break;
    }
  }

  useEffect(() => {
    dispatch(getDevice());
    dispatch(getBOM()).then(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    deviceParams.idDevice ? findDevice(devices, deviceParams.idDevice) : setSelectedDevice(undefined);
  }, [deviceParams])

  useEffect(() => {
    setDeviceCode(selectedDevice?.deviceCode ?? '');
    setDeviceName(selectedDevice?.deviceName ?? '');
    setDeviceNo(selectedDevice?.deviceNo ?? '');
    setDeviceActive(selectedDevice?.active ?? false);

    let tempArray = BOMs.filter((bom: BOMType) => bom.idDevice.toString() === deviceParams.idDevice);
    setDeviceBOM(tempArray ? [...tempArray] : []);

  }, [selectedDevice])

  if (isLoading) {
    return (<div className="mt-20"><Loading /></div>)
  }

  return (
    <>
      <div className="flex flex-wrap lg:flex-nowrap">
        <BorderOne className="w-64 h-screen overflow-auto mx-2">
          <DeviceTree deviceTree={devices} />
        </BorderOne>
        <div className="w-full">
          <BorderOne title="مشخصات دستگاه" className="relative">
            <div className="absolute top-1">
              <MutationMenu handleAction={handleMutateAction} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <TextField value={deviceCode} onChange={event => setDeviceCode(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="body2" >کد دستگاه</Typography>} size="small" />
              <TextField value={deviceName} onChange={event => setDeviceName(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="body2" >نام دستگاه</Typography>} size="small" />
              <TextField value={deviceNo} onChange={event => setDeviceNo(event.target.value)} sx={{ mb: 1 }} variant="outlined" label={<Typography variant="body2" >مشخصه فنی</Typography>} size="small" />
              <FormControlLabel control={<Checkbox checked={deviceActive} onChange={event => setDeviceActive(event.target.checked)} />} label={<Typography variant="body2" >فعال</Typography>} />
            </div>
          </BorderOne>
          <BorderOne>
            <CacheProvider value={cacheDataTable}>
              <MUIDataTable data={deviceBOM} columns={BOMTableColumns} title='BOM' options={DataTableOptions} />
            </CacheProvider>
          </BorderOne>
        </div>
      </div>
    </>
  )
}
