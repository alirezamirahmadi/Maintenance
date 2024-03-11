import { ProblemType, ListDeviceNameType, ListServiceType, ActivityType } from "./BaseInfoType";

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

type ActionType = {
  id: number,
  workorder?:WorkOrderType,
  startDate: string,
  endDate: string,
  activityResult:ListActivityResultType[],
  description?: string,
}

type ListActionType = {
  id: number,
  idWorkOrder:number,
  device: string,
  service: string,
  startDate: string,
  endDate: string,
  description?: string,
}

type ActivityResultType = {
  id: number,
  activity:ActivityType,
  isDo:boolean,
  description?: string,
}

type ListActivityResultType = {
  id: number,
  idAction:number,
  activity:string,
  isDo:boolean,
  description?: string,
}

export type { NoticeType, ListNoticeType, WorkOrderType, ListWorkOrderType, ActionType, ActivityResultType, 
  ListActionType, ListActivityResultType }