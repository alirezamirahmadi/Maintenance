import { ProblemType, ListDeviceNameType, ListServiceType } from "./BaseInfoType"

type NoticeType = {
  id: number,
  device: ListDeviceNameType,
  noticeDate: string,
  description?: string,
  problem: ProblemType[],
}

type ListNoticeType = {
  id: number,
  deviceName: string,
  noticeDate: string,
  description?: string,
}

type WorkOrderType = {
  id: number,
  device: ListDeviceNameType,
  service: ListServiceType,
  startDate: string,
  endDate: string,
  description?: string,
}
type ListWorkOrderType = {
  id: number,
  device: string,
  service: string,
  startDate: string,
  endDate: string,
  description?: string,
}



export type { NoticeType, ListNoticeType, WorkOrderType, ListWorkOrderType }