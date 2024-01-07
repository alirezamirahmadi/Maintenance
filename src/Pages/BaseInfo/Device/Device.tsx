import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from '../../../Redux/Store';

import BorderOne from "../../../Components/Global/Border/BorderOne"
import { DeviceType } from "../../../Types/BaseInfoType";
import DeviceTree from "./DeviceTree";

export default function Device(): React.JSX.Element {
  const devices = useSelector((state: RootState) => state.device);

  return (
    <>
      <div className="flex ">
        <BorderOne className="w-64 h-screen overflow-auto">
          <DeviceTree deviceTree={devices} />
        </BorderOne>
        <div className="w-full">
          <BorderOne title="مشخصات دستگاه" className="w-full">

          </BorderOne>
          <BorderOne title="BOM" className="w-full">

          </BorderOne>
        </div>
      </div>
    </>
  )
}
