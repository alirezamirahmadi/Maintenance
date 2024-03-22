import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Box, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel, } from '@mui/lab';
import MUIDataTable from "mui-datatables";
import { CacheProvider } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';

import type { RootState, AppDispatch } from '../../../Redux/Store';
import { getProblem, postProblem, putProblem, deleteProblem } from "../../../Redux/Reducer/ProblemReducer";
import BorderOne from "../../../Components/Global/Border/BorderOne";
import type { ServiceType } from "../../../Types/BaseInfoType";
import { cacheDataTable } from "../../../Theme";
import { ProblemTableColumns } from "../../../Utils/Datas";
import { DataTableOptions } from "../../../Utils/Datas";
import MutationMenu from "../../../Components/Global/mutationMenu/MutationMenu";
import Loading from "../../../Components/Global/loading/Loading";

export default function Problem(): React.JSX.Element {

  const theme = useTheme();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch: AppDispatch = useDispatch();
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

  const saveProblem = () => {
    dispatch(problem ? putProblem({ id: problem.id, title }) : postProblem({ id: problems.length + 1, title }))
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
        navigate('/problem');
        break;
      case 'save':
        saveProblem();
        break;
      case 'delete':
        dispatch(deleteProblem(problem?.id ?? 0))
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
    dispatch(getProblem()).then(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    setTitle(problem?.title ?? '');
  }, [problem])

  useEffect(() => {
    let index: number = problems.findIndex((service: ServiceType) => service.id.toString() === problemParams.idProblem);
    setProblem((index != -1 && problemParams.idProblem) ? problems[index] : undefined);
  }, [[], problemParams])

  if (isLoading) {
    return (<div className="mt-20"><Loading /></div>)
  }

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
          <BorderOne title="ایراد" className="relative">
            <div className="absolute top-0">
              <MutationMenu handleAction={handleMutateAction} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              <TextField variant="outlined" size="small" value={title} onChange={event => setTitle(event.target.value)} label='عنوان'></TextField>
            </div>
          </BorderOne>
        </TabPanel>
        <TabPanel value="2">
          <CacheProvider value={cacheDataTable}>
            <MUIDataTable data={problems} columns={ProblemTableColumns} title='ایرادها' options={{ ...DataTableOptions, onRowClick: (rowData: string[]) => showDetailProblem(rowData) }} />
          </CacheProvider>
        </TabPanel>
      </TabContext>
    </>
  )
}