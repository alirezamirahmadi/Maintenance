import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel, } from '@mui/lab';
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import type { Value } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import { useSelector } from "react-redux";
import type { RootState } from '../../../Redux/Store';

import BorderOne from "../../../Components/Global/Border/BorderOne";
import { cacheDataTable } from "../../../Theme";
import SelectDevice from "../../../Components/Global/SelectDevice/SelectDevice";
import SelectService from "../../../Components/Global/SelectService/SelectService";
import {
  ListActionData, DataTableOptions, ActionTableColumns, listDeviceNameData, ListServiceData,
  ActivityResultTableColumns, ListActivityResultData
} from "../../../Utils/Datas";
import { WorkOrderType, ActionType, ListActivityResultType } from "../../../Types/OperationType";
import { ListServiceType, ListDeviceNameType } from "../../../Types/BaseInfoType";

export default function WorkOrder(): React.JSX.Element {
  const actions = useSelector((state: RootState) => state.action);
  const [tabIndex, setTabIndex] = React.useState('1');
  const [action, setAction] = useState<ActionType>();
  const [workorder, setWorkOrder] = useState<WorkOrderType>();
  const [device, setDevice] = useState<ListDeviceNameType>(listDeviceNameData[0]);
  const [service, setService] = useState<ListServiceType>(ListServiceData[0]);
  const [startDate, setStartDate] = useState<Value>();
  const [endDate, setEndDate] = useState<Value>();
  const [description, setDescription] = useState<string>('');
  const [serviceKind, setServiceKind] = useState<string>('');
  const [servicePeriod, setServicePeriod] = useState<string>('');
  const [serviceDuration, setServiceDuration] = useState<number>(0);
  const [activityResult, setActivityResult] = useState<ListActivityResultType[]>([]);
  const actionParams = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  }
  const showDetailWorkOrder = (rowData: string[]) => {
    navigate(`/action/${rowData[0]}`);
    setTabIndex('1');
  }
  const handleSelectedDevice = (idDevice: number) => {

  }
  const handleSelectedService = (service: ListServiceType) => {

  }

  useEffect(() => {
    if (action) {
      setWorkOrder(action.workorder);
      setDevice(action.workorder.device);
      setService(action.workorder.service);
      setServiceKind(action.workorder.service.kind);
      setServicePeriod(action.workorder.service.period ? action.workorder.service.period : '');
      setServiceDuration(action.workorder.service.duration ? action.workorder.service.duration : 0);
      setStartDate(action.startDate);
      setEndDate(action.endDate);
      setDescription(action.description ? action.description : '');
      setActivityResult(ListActivityResultData.filter(result => result.idAction === action.id));
    }
  }, [action])
  useEffect(() => {
    let index: number = actions.findIndex((workorder: WorkOrderType) => workorder.id.toString() === actionParams.idAction);
    if (index != -1) {
      setAction(actions[index]);
    }
  }, [[], actionParams])

  return (
    <>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="action">
            <Tab label="اطلاعات" value="1" />
            <Tab label="فهرست" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BorderOne title="عملکرد">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <TextField variant="outlined" size="small" value={workorder && workorder.id} disabled label='شماره دستورکار'></TextField>
              <SelectDevice value={device} selectedDevice={handleSelectedDevice} />
              <SelectService value={service} selectedService={handleSelectedService} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-4">
              <TextField variant="outlined" size="small" value={serviceKind} disabled label='نوع سرویس'></TextField>
              <TextField variant="outlined" size="small" value={servicePeriod} disabled label='دوره زمانی'></TextField>
              <TextField variant="outlined" size="small" value={serviceDuration} disabled label='مدت زمان'></TextField>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mt-4">
              <DatePicker
                id="start-date" calendar={persian} locale={persian_fa} calendarPosition="bottom-right" value={startDate} onChange={setStartDate} className={theme.palette.mode === 'dark' ? 'bg-dark' : ''} style={{ backgroundColor: theme.palette.background.default, height: '40px', width: '100%' }}
                render={(value, openCalendar) => { return (<TextField variant="outlined" size="small" label='تاریخ شروع' value={value} onClick={openCalendar}></TextField>) }}
              />
              <DatePicker
                id="end-date" calendar={persian} locale={persian_fa} calendarPosition="bottom-right" value={endDate} onChange={setEndDate} className={theme.palette.mode === 'dark' ? 'bg-dark' : ''} style={{ backgroundColor: theme.palette.background.default, height: '40px', width: '100%' }}
                render={(value, openCalendar) => { return (<TextField variant="outlined" size="small" label='تاریخ پایان' value={value} onClick={openCalendar}></TextField>) }}
              />
              <TextField variant="outlined" size="small" value={description} onChange={event => setDescription(event.target.value)} label='توضیحات'></TextField>
            </div>
          </BorderOne>
          <BorderOne>
            <CacheProvider value={cacheDataTable}>
              <MUIDataTable data={activityResult} columns={ActivityResultTableColumns} title='نتیجه فعالیت ها' options={{ ...DataTableOptions, onRowClick: (rowData: string[]) => showDetailWorkOrder(rowData) }} />
            </CacheProvider>
          </BorderOne>
        </TabPanel>
        <TabPanel value="2">
          <CacheProvider value={cacheDataTable}>
            <MUIDataTable data={ListActionData} columns={ActionTableColumns} title='عملکرد ها' options={{ ...DataTableOptions, onRowClick: (rowData: string[]) => showDetailWorkOrder(rowData) }} />
          </CacheProvider>
        </TabPanel>
      </TabContext>
    </>
  )
}