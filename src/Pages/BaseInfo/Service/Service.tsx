import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Select, MenuItem, FormControl, InputLabel, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel, } from '@mui/lab';
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from '../../../Redux/Store';

import { getService, postService, putService, deleteService } from "../../../Redux/Reducer/ServiceReducer";
import BorderOne from "../../../Components/Global/Border/BorderOne";
import type { ServiceType, ActivityType } from "../../../Types/BaseInfoType";
import { cacheDataTable } from "../../../Theme";
import { ActivityTableColumns, ServiceTableColumns, ListServiceData } from "../../../Utils/Datas";
import { DataTableOptions } from "../../../Utils/Datas";
import MutationMenu from "../../../Components/Global/mutationMenu/MutationMenu";
import Loading from "../../../Components/Global/loading/Loading";

export default function Service(): React.JSX.Element {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
  const services = useSelector((state: RootState) => state.service);
  const [tabIndex, setTabIndex] = React.useState('1');
  const [service, setService] = useState<ServiceType>();
  const [title, setTitle] = useState<string>('');
  const [kind, setKind] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [activity, setActivity] = useState<ActivityType[]>([]);
  const serviceParams = useParams();
  const navigate = useNavigate();

  const handleDuration = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(event.target.value);
    value < 0 ? setDuration(0) : setDuration(value);
  }

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  }

  const showDetailService = (rowData: string[]) => {
    navigate(`/service/${rowData[0]}`);
    setTabIndex('1');
  }

  const saveService = () => {
    const body: ServiceType = { id: services.length + 1, title, kind: { id: 1, text: 'تعمیراتی' }, period: { id: 1, text: 'ساعت' }, duration, activity };
    dispatch(service ? putService({ ...body, id: service.id }) : postService({ ...body }));
  }

  const handleMutateAction = (action: string) => {
    switch (action) {
      case 'new':
        navigate('/service')
        break;
      case 'save':
        saveService();
        break;
      case 'delete':
        dispatch(deleteService(service?.id ?? 0))
        break;
    }
  }

  useEffect(() => {
    dispatch(getService()).then(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    setTitle(service?.title ?? '');
    setKind(service?.kind.id?.toString() ?? '');
    setPeriod(service?.period?.id?.toString() ?? '');
    setDuration(service?.duration ?? 0);
    setActivity(service?.activity ?? []);
  }, [service])

  useEffect(() => {
    let index: number = services.findIndex((service: ServiceType) => service.id?.toString() === serviceParams.idService);
    setService((index != -1 && serviceParams.idService) ? services[index] : undefined);
  }, [[], serviceParams])

  if (isLoading) {
    return (<div className="mt-20"><Loading /></div>)
  }

  return (
    <>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="service">
            <Tab label="اطلاعات" value="1" />
            <Tab label="فهرست" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BorderOne title="سرویس" className="relative">
            <div className="absolute top-1">
              <MutationMenu handleAction={handleMutateAction} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <TextField variant="outlined" size="small" value={title} onChange={event => setTitle(event.target.value)} label='عنوان'></TextField>
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="serivce-type">نوع سرویس</InputLabel>
                <Select labelId="serivce-type" value={kind} onChange={(event) => setKind(event.target.value)} >
                  <MenuItem value={1} sx={{ direction: 'ltr' }}>تعمیراتی</MenuItem>
                  <MenuItem value={2} sx={{ direction: 'ltr' }}>پیشگیرانه</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ minWidth: 150 }} size="small">
                <InputLabel id="service-period">دوره زمانی</InputLabel>
                <Select labelId="service-period" value={period} onChange={(event) => setPeriod(event.target.value)} >
                  <MenuItem value={1} sx={{ direction: 'ltr' }}>ساعت</MenuItem>
                  <MenuItem value={2} sx={{ direction: 'ltr' }}>روز</MenuItem>
                  <MenuItem value={3} sx={{ direction: 'ltr' }}>هفته</MenuItem>
                  <MenuItem value={4} sx={{ direction: 'ltr' }}>ماه</MenuItem>
                </Select>
              </FormControl>
              <TextField variant="outlined" size="small" type="number" sx={{ maxWidth: 100 }} value={duration} onChange={handleDuration} label='مدت زمان'></TextField>
            </div>
          </BorderOne>
          <BorderOne>
            <CacheProvider value={cacheDataTable}>
              <MUIDataTable data={activity} columns={ActivityTableColumns} title='فعالیت ها' options={DataTableOptions} />
            </CacheProvider>
          </BorderOne>
        </TabPanel>
        <TabPanel value="2">
          <CacheProvider value={cacheDataTable}>
            <MUIDataTable data={ListServiceData} columns={ServiceTableColumns} title='سرویس ها' options={{ ...DataTableOptions, onRowClick: (rowData: string[]) => showDetailService(rowData) }} />
          </CacheProvider>
        </TabPanel>
      </TabContext>
    </>
  )
}