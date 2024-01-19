import { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material"

import { listDeviceNameData } from "../../../Utils/Datas"
import { ListDeviceNameType } from "../../../Types/BaseInfoType";

export default function SelectDevice({ value, selectedDevice }: { value:ListDeviceNameType, selectedDevice: (idDevice: number) => void }): React.JSX.Element {
  const [device, setDevice] = useState<ListDeviceNameType>(value);

  const handleSelectDevice = (device: ListDeviceNameType | null) => {
    device && setDevice(device);
    device && selectedDevice(device.id);
  }

  useEffect(()=> {
    // console.log(value);
    
    setDevice(value);
  }, [value])

  return (
    <>
      <Autocomplete id="device" options={listDeviceNameData} autoHighlight value={device}
        onChange={(event: any, newValue: ListDeviceNameType | null) => handleSelectDevice(newValue)}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.deviceName + ' (' + option.deviceCode + ')'}
        renderOption={(props, option) => (
          <Box key={option.id} component="li" {...props}>
            {option.deviceName} + ({option.deviceCode})
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="دستگاه" inputProps={{ ...params.inputProps, }} />
        )}
      />
    </>
  )
}