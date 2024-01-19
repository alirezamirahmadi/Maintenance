type DeviceType = {
  id: number,
  deviceName: string,
  deviceCode: string,
  deviceNo: string,
  active: boolean,
  subDevice?: DeviceType[],
}

type ListDeviceNameType = {
  id: number,
  deviceName: string,
  deviceCode: string,
}

type BOMType = {
  id: number,
  idDevice: number,
  BOMCode: string,
  BOMName: string,
  BOMNo: string,
  BOMNumber: number,
  active: boolean,
}

type ServiceType = {
  id: number,
  title: string,
  kind: { id: 2, text: 'پیشگیرانه' } | { id: 1, text: 'تعمیراتی' },
  period?: { id: 1, text: 'ساعت' } | { id: 2, text: 'روز' } | { id: 3, text: 'هفته' } | { id: 4, text: 'ماه' },
  duration?: number,
  activity: ActivityType[],
}

type ListServiceType = {
  id: number,
  title: string,
  kind: string,
  period?: string,
  duration?: number,
}

type ActivityType = {
  id: number,
  title: string,
}

type ProblemType = {
  id: number,
  title: string,
}

export type {
  DeviceType, BOMType, ServiceType, ListServiceType, ActivityType, ProblemType,
  ListDeviceNameType
}