import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../Redux/Store'

import { DeviceData, BOMData, ServiceData } from "./Datas";
import { addDevice } from '../Redux/Reducer/DeviceReducer';
import { addBOM } from '../Redux/Reducer/BOMReducer';
import { addToService } from '../Redux/Reducer/ServiceReducer';

export default function LoadDatas ():React.JSX.Element {
  const dispatch: AppDispatch = useDispatch()

  useEffect(()=> {
    dispatch(addDevice(DeviceData)); 
    BOMData.map(bom => dispatch(addBOM(bom)));
    ServiceData.map(service => dispatch(addToService(service)));
  }, [])
  return(<></>)
}