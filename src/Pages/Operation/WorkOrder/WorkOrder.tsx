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
import { WorkOrderType } from "../../../Types/OperationType";
import { cacheDataTable } from "../../../Theme";
import SelectDevice from "../../../Components/Global/SelectDevice/SelectDevice";
import SelectService from "../../../Components/Global/SelectService/SelectService";
import { ListWorkOrderData, DataTableOptions, WorkOrderTableColumns, listDeviceNameData, ListServiceData } from "../../../Utils/Datas";
import { ListServiceType, ListDeviceNameType } from "../../../Types/BaseInfoType";

export default function WorkOrder(): React.JSX.Element {
  const workorders = useSelector((state: RootState) => state.workorder);
  const [tabIndex, setTabIndex] = React.useState('1');
  const [workorder, setWorkOrder] = useState<WorkOrderType>();
  const [device, setDevice] = useState<ListDeviceNameType>(listDeviceNameData[0]);
  const [service, setService] = useState<ListServiceType>(ListServiceData[0]);
  const [startDate, setStartDate] = useState<Value>();
  const [endDate, setEndDate] = useState<Value>();
  const [description, setDescription] = useState<string>('');
  const workorderParams = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  }
  const showDetailWorkOrder = (rowData: string[]) => {
    navigate(`/workorder/${rowData[0]}`);
    setTabIndex('1');
  }
  const handleSelectedDevice = (idDevice: number) => {

  }
  const handleSelectedService = (service: ListServiceType) => {

  }

  useEffect(() => {
    if (workorder) {
      setDevice(workorder.device);
      setService(workorder.service);
      setStartDate(workorder.startDate);
      setEndDate(workorder.endDate);
      setDescription(workorder.description ? workorder.description : '');
    }
  }, [workorder])
  useEffect(() => {
    let index: number = workorders.findIndex((workorder: WorkOrderType) => workorder.id.toString() === workorderParams.idWorkOrder);
    if (index != -1) {
      setWorkOrder(workorders[index]);
    }
  }, [[], workorderParams])

  return (
    <>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="work-order">
            <Tab label="اطلاعات" value="1" />
            <Tab label="فهرست" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BorderOne title="دستورکار">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <SelectDevice value={device} selectedDevice={handleSelectedDevice} />
              <SelectService value={service} selectedService={handleSelectedService} />
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
        </TabPanel>
        <TabPanel value="2">
          <CacheProvider value={cacheDataTable}>
            <MUIDataTable data={ListWorkOrderData} columns={WorkOrderTableColumns} title='دستورکار ها' options={{ ...DataTableOptions, onRowClick: (rowData: string[]) => showDetailWorkOrder(rowData) }} />
          </CacheProvider>
        </TabPanel>
      </TabContext>
    </>
  )
}