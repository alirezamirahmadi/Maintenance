import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel, } from '@mui/lab';
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import Swal from "sweetalert2";
import type { Value } from "react-multi-date-picker";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css"

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from '../../../Redux/Store';
import { getWorkOrder, postWorkOrder, putWorkOrder, deleteWorkOrder } from "../../../Redux/Reducer/WorkOrderReducer";
import BorderOne from "../../../Components/Global/Border/BorderOne";
import type { WorkOrderType } from "../../../Types/OperationType";
import { cacheDataTable } from "../../../Theme";
import SelectDevice from "../../../Components/Global/SelectDevice/SelectDevice";
import SelectService from "../../../Components/Global/SelectService/SelectService";
import { ListWorkOrderData, DataTableOptions, WorkOrderTableColumns, listDeviceNameData, ListServiceData } from "../../../Utils/Datas";
import { ListServiceType, ListDeviceNameType } from "../../../Types/BaseInfoType";
import MutationMenu from "../../../Components/Global/mutationMenu/MutationMenu";
import Loading from "../../../Components/Global/loading/Loading";

export default function WorkOrder(): React.JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  const workorders = useSelector((state: RootState) => state.workorder);
  const [tabIndex, setTabIndex] = React.useState('1');
  const [workorder, setWorkOrder] = useState<WorkOrderType>();
  const [device, setDevice] = useState<ListDeviceNameType>(listDeviceNameData[0]);
  const [service, setService] = useState<ListServiceType>(ListServiceData[0]);
  const [startDate, setStartDate] = useState<Value>();
  const [endDate, setEndDate] = useState<Value>();
  const [description, setDescription] = useState<string>('');
  const [serviceKind, setServiceKind] = useState<string>('');
  const [servicePeriod, setServicePeriod] = useState<string>('');
  const [serviceDuration, setServiceDuration] = useState<number>(0);
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

  const saveWorkOrder = () => {
    const body: WorkOrderType = { id: workorders.length + 1, device, service, startDate: String(startDate), endDate: String(endDate), description };
    dispatch(workorder ? putWorkOrder({ ...body, id: workorder.id }) : postWorkOrder({ ...body }))
      .then(() => {
        Swal.fire({
          title: 'ذخیره',
          text: 'عملیات مورد نظر با موفقیت انجام شد',
          icon: 'success',
          confirmButtonText: 'تایید',
          confirmButtonColor: theme.palette.primary.main,
        })
      });
  }

  const handleMutateAction = (action: string) => {
    switch (action) {
      case 'new':
        navigate('/workorder')
        break;
      case 'save':
        saveWorkOrder();
        break;
      case 'delete':
        dispatch(deleteWorkOrder(workorder?.id ?? 0))
          .then(() => {
            Swal.fire({
              title: 'حذف',
              text: 'عملیات حذف با موفقیت انجام شد',
              icon: 'success',
              confirmButtonText: 'تایید',
              confirmButtonColor: theme.palette.primary.main,
            })
          });
        break;
    }
  }

  useEffect(() => {
    dispatch(getWorkOrder()).then(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    setDevice(workorder?.device ?? listDeviceNameData[0]);
    setService(workorder?.service ?? ListServiceData[0]);
    setServiceKind(workorder?.service?.kind ?? ListServiceData[0].kind);
    setServicePeriod(workorder?.service.period ?? '');
    setServiceDuration(workorder?.service.duration ?? 0);
    setStartDate(workorder?.startDate ?? '');
    setEndDate(workorder?.endDate ?? '');
    setDescription(workorder?.description ?? '');
  }, [workorder])
  useEffect(() => {
    let index: number = workorders.findIndex((workorder: WorkOrderType) => workorder.id.toString() === workorderParams.idWorkOrder);
    setWorkOrder((index != -1 && workorderParams.idWorkOrder) ? workorders[index] : undefined);
  }, [[], workorderParams])

  if (isLoading) {
    return (<div className="mt-20"><Loading /></div>)
  }

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
          <BorderOne title="دستورکار" className="relative">
            <div className="absolute top-0">
              <MutationMenu handleAction={handleMutateAction} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
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