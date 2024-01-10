type DeviceType = {
  id: number,
  deviceName: string,
  deviceCode: string,
  deviceNo: string,
  active: boolean,
  subDevice?: DeviceType[],
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

type ServicePeriod = {
  id: number,
  title: { id: 1, text: 'ساعت' } | { id: 2, text: 'روز' } | { id: 3, text: 'هفته' } | { id: 4, text: 'ماه' },
  duration: number,
}

type ServiceType = {
  id: number,
  title: string,
  kind: { id: 2, text: 'پیشگیرانه' } | { id: 1, text: 'تعمیراتی' },
  period?: ServicePeriod,
  activity: ActivityType[],
}

type ActivityType = {
  id: number,
  title: string,
}

export type { DeviceType, BOMType, ServicePeriod, ServiceType, ActivityType, }