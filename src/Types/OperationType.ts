import { ProblemType, ListDeviceNameType } from "./BaseInfoType"

type NoticeType = {
  id:number,
  device:ListDeviceNameType,
  noticeDate:string,
  description?:string,
  problem:ProblemType[],
}

type ListNoticeType = {
  id:number,
  deviceName:string,
  noticeDate:string,
  description?:string,
}




export type {NoticeType, ListNoticeType}