type DeviceType = {
  id:number,
  deviceName:string,
  deviceCode:string,
  deviceNo:string,
  active:boolean,
  subDevice?:DeviceType[],
}

type BOMType = {
  id:number,
  idDevice:number,
  BOMCode:string,
  BOMName:string,
  BOMNo:string,
  BOMNumber:number,
  active:boolean,
}

export type {DeviceType, BOMType}