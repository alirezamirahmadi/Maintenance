import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../Redux/Store'

import { DeviceData, BOMData, ServiceData, ProblemData, NoticeData } from "./Datas";
import { addDevice } from '../Redux/Reducer/DeviceReducer';
import { addBOM } from '../Redux/Reducer/BOMReducer';
import { addToService } from '../Redux/Reducer/ServiceReducer';
import { addToProblem } from '../Redux/Reducer/ProblemReducer';
import { addToNotice } from '../Redux/Reducer/NoticeReducer';

export default function LoadDatas ():React.JSX.Element {
  const dispatch: AppDispatch = useDispatch()

  useEffect(()=> {
    dispatch(addDevice(DeviceData)); 
    BOMData.map(bom => dispatch(addBOM(bom)));
    ServiceData.map(service => dispatch(addToService(service)));
    ProblemData.map(problem => dispatch(addToProblem(problem)));
    NoticeData.map(notice => dispatch(addToNotice(notice)));
  }, [])
  return(<></>)
}