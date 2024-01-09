import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../Redux/Store'

import { DeviceData, BOMData } from "./Datas";
import { addDevice } from '../Redux/Reducer/DeviceReducer';
import { addBOM } from '../Redux/Reducer/BOMReducer';

export default function LoadDatas ():React.JSX.Element {
  const dispatch: AppDispatch = useDispatch()

  useEffect(()=> {
    dispatch(addDevice(DeviceData)); 
    BOMData.map(bom => dispatch(addBOM(bom)));
  }, [])
  return(<></>)
}