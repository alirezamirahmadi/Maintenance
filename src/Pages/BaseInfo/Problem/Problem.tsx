import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel, } from '@mui/lab';
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import { useSelector } from "react-redux";
import type { RootState } from '../../../Redux/Store';

import BorderOne from "../../../Components/Global/Border/BorderOne";
import { ServiceType } from "../../../Types/BaseInfoType";
import { cacheDataTable } from "../../../Theme";
import { ProblemTableColumns } from "../../../Utils/Datas";
import { DataTableOptions } from "../../../Utils/Datas";

export default function Problem(): React.JSX.Element {
  const problems = useSelector((state: RootState) => state.problem);
  const [tabIndex, setTabIndex] = React.useState('1');
  const [problem, setProblem] = useState<ServiceType>();
  const [title, setTitle] = useState<string>('');
  const problemParams = useParams();
  const navigate = useNavigate();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabIndex(newValue);
  }
  const showDetailProblem = (rowData: string[]) => {
    navigate(`/problem/${rowData[0]}`);
    setTabIndex('1');
  }

  useEffect(() => {
    if (problem) {
      setTitle(problem.title);
    }
  }, [problem])

  useEffect(() => {
    let index: number = problems.findIndex((service: ServiceType) => service.id.toString() === problemParams.idProblem);
    if (index != -1) {
      setProblem(problems[index]);
    }
  }, [[], problemParams])

  return (
    <>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChangeTab} aria-label="problem">
            <Tab label="اطلاعات" value="1" />
            <Tab label="فهرست" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <BorderOne title="ایراد">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <TextField variant="outlined" size="small" value={title} onChange={event => setTitle(event.target.value)} label='عنوان'></TextField>
            </div>
          </BorderOne>
        </TabPanel>
        <TabPanel value="2">
          <CacheProvider value={cacheDataTable}>
            <MUIDataTable data={problems} columns={ProblemTableColumns} title='ایرادها' options={{...DataTableOptions, onRowClick:(rowData: string[]) => showDetailProblem(rowData)}} />
          </CacheProvider>
        </TabPanel>
      </TabContext>
    </>
  )
}