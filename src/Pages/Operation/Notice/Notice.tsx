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
import { ProblemType } from "../../../Types/BaseInfoType";
import { NoticeType } from "../../../Types/OperationType";
import { cacheDataTable } from "../../../Theme";
import SelectDevice from "../../../Components/Global/SelectDevice/SelectDevice";
import {
  ProblemTableColumns, ListNoticeData, DataTableOptions, NoticeTableColumns, listDeviceNameData
} from "../../../Utils/Datas";
import { ListDeviceNameType } from "../../../Types/BaseInfoType";

export default function Notice(): React.JSX.Element {
  const notices = useSelector((state: RootState) => state.notice);
  const [tabIndex, setTabIndex] = React.useState('1');
  const [notice, setNotice] = useState<NoticeType>();
  const [device, setDevice] = useState<ListDeviceNameType>(listDeviceNameData[0]);
  const [problem, setProblem] = useState<ProblemType[]>([]);
  const [description, setDescription] = useState<string>('');
  const [noticeDate, setNoticeDate] = useState<Value>(new Date());
  const noticeParams = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  }
  const showDetailNotice = (rowData: string[]) => {
    navigate(`/notice/${rowData[0]}`);
    setTabIndex('1');
  }
  const handleSelectedDevice = (idDevice:number) => {
    
  }

  useEffect(() => {
    if (notice) {
      let tempDevice = listDeviceNameData.find(device => device.id === notice.device.id);
      tempDevice && setDevice(tempDevice);
      setNoticeDate(notice.noticeDate);
      setProblem(notice.problem);
      setDescription(notice.description ? notice.description : '');
    }
  }, [notice])
  useEffect(() => {
    let index: number = notices.findIndex((notice: NoticeType) => notice.id.toString() === noticeParams.idNotice);
    if (index != -1) {
      setNotice(notices[index]);
    }
  }, [[], noticeParams])

  return (
    <>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="lab API tabs example">
            <Tab label="اطلاعات" value="1" />
            <Tab label="فهرست" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BorderOne title="اعلان">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <SelectDevice value={device} selectedDevice={handleSelectedDevice}/>
              <DatePicker calendar={persian} locale={persian_fa} calendarPosition="bottom-right" value={noticeDate} onChange={setNoticeDate} className={theme.palette.mode === 'dark' ? 'bg-dark' : ''} style={{ backgroundColor: theme.palette.background.default, height: '40px', direction: 'ltr', width:'100%' }} />
              <TextField variant="outlined" size="small" value={description} onChange={event => setDescription(event.target.value)} label='توضیحات'></TextField>
            </div>
          </BorderOne>
          <BorderOne>
            <CacheProvider value={cacheDataTable}>
              <MUIDataTable data={problem} columns={ProblemTableColumns} title='ایرادها' options={DataTableOptions} />
            </CacheProvider>
          </BorderOne>
        </TabPanel>
        <TabPanel value="2">
          <CacheProvider value={cacheDataTable}>
            <MUIDataTable data={ListNoticeData} columns={NoticeTableColumns} title='اعلان ها' options={{ ...DataTableOptions, onRowClick: (rowData: string[]) => showDetailNotice(rowData) }} />
          </CacheProvider>
        </TabPanel>
      </TabContext>
    </>
  )
}