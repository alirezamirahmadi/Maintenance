import { useState, useEffect } from "react";
import { Autocomplete, Box, TextField } from "@mui/material"

import { ListServiceData } from "../../../Utils/Datas"
import { ListServiceType } from "../../../Types/BaseInfoType";

export default function SelectService({ value, selectedService }: { value:ListServiceType, selectedService: (service: ListServiceType) => void }): React.JSX.Element {
  const [service, setService] = useState<ListServiceType>(value);

  const handleSelectService = (service: ListServiceType | null) => {
    service && setService(service);
    service && selectedService(service);
  }

  useEffect(()=> {
    setService(value);
  }, [value])

  return (
    <>
      <Autocomplete id="device" options={ListServiceData} autoHighlight value={service}
        onChange={(event: any, newValue: ListServiceType | null) => handleSelectService(newValue)}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionKey={(option) => option.id}
        getOptionLabel={(option) => option.title}
        renderOption={(props, option) => (
          <Box key={option.id} component="li" {...props}>
            {option.title}
          </Box>
        )}
        renderInput={(params) => (
          <TextField {...params} label="سرویس" inputProps={{ ...params.inputProps, }} />
        )}
      />
    </>
  )
}