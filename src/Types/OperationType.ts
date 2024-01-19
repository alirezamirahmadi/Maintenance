import { ProblemType } from "./BaseInfoType"

type NoticeType = {
  id:number,
  idDevice:number,
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