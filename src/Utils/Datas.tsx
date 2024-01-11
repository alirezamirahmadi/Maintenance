import { GridColDef } from '@mui/x-data-grid';
import { MUIDataTableColumn } from 'mui-datatables';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import CableIcon from '@mui/icons-material/Cable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import { MenuItemType } from '../Types/BasicType';
import { DeviceType, BOMType, ServiceType, ListServiceType, ActivityType } from '../Types/BaseInfoType';

const MenuItemData: MenuItemType[] = [
  { id: 1, title: 'اطلاعات پایه', icon: <ViewComfyIcon fontSize='large' />, subMenu: [{ id: 1, title: 'دستگاه', icon: <CableIcon fontSize='medium' color='inherit' />, href: '/device' }, { id: 2, title: 'سرویس', icon: <ReceiptLongIcon fontSize='medium' color='inherit' />, href: '/service' }] },
  { id: 2, title: 'عملیات', icon: <SelectAllIcon fontSize='large' />, subMenu: [{ id: 3, title: 'اعلان', icon: <NotificationsIcon fontSize='medium' color='inherit' />, href: '/notice' }, { id: 4, title: 'دستورکار', icon: <VerticalSplitIcon fontSize='medium' color='inherit' />, href: '/workOrder' }, { id: 5, title: 'عملکرد', icon: <WorkHistoryIcon fontSize='medium' color='inherit' />, href: '/action' }] }
]

const DeviceData: DeviceType =
{
  id: 0, deviceCode: '00', deviceName: 'کارخانه', deviceNo: 'q0', active: true, subDevice:
    [
      {
        id: 1, deviceCode: '11', deviceName: 'سنگ شکن واحد یک', deviceNo: 'q1a1', active: true, subDevice:
          [
            { id: 7, deviceCode: '111', deviceName: 'سنگ شکن واحد', deviceNo: 'q1a1w1', active: true },
            { id: 16, deviceCode: '112', deviceName: 'سنگ نشکن واحد', deviceNo: 'q1a1w2', active: true },
          ]
      },
      {
        id: 2, deviceCode: '12', deviceName: 'سنگ شکن واحد دو', deviceNo: 'q1a2', active: true, subDevice:
          [
            { id: 8, deviceCode: '121', deviceName: 'سنگ شکن واحد', deviceNo: 'q1a2w1', active: true },
          ]
      },
      {
        id: 3, deviceCode: '21', deviceName: 'آسیاب واحد یک', deviceNo: 'q2a1', active: true, subDevice:
          [
            { id: 9, deviceCode: '211', deviceName: 'آسیاب واحد', deviceNo: 'q2a1w1', active: true },
          ]
      },
      {
        id: 4, deviceCode: '22', deviceName: 'آسیاب واحد دو', deviceNo: 'q2a2', active: true, subDevice:
          [
            { id: 10, deviceCode: '221', deviceName: 'آسیاب واحد', deviceNo: 'q2a2w1', active: true },
          ]
      },
      {
        id: 5, deviceCode: '31', deviceName: 'کوره واحد یک', deviceNo: 'q3a1', active: true, subDevice:
          [
            { id: 11, deviceCode: '311', deviceName: 'کوره واحد', deviceNo: 'q3a1w1', active: true },
          ]
      },
      {
        id: 6, deviceCode: '32', deviceName: 'کوره واحد دو', deviceNo: 'q3a2', active: true, subDevice:
          [
            {
              id: 12, deviceCode: '321', deviceName: 'کوره واحد', deviceNo: 'q3a2w1', active: true, subDevice:
                [
                  { id: 13, deviceCode: '2211', deviceName: 'آسیاب', deviceNo: 'q2a2w11', active: true },
                  { id: 14, deviceCode: '3111', deviceName: 'کوره', deviceNo: 'q3a1w11', active: true },
                  { id: 15, deviceCode: '3211', deviceName: 'کوره', deviceNo: 'q3a2w11', active: true },
                ]
            },
          ]
      },
    ]
}

const BOMData: BOMType[] = [
  { id: 1, idDevice: 1, BOMCode: '1a1', BOMName: 'فن', BOMNo: 'swe 22', BOMNumber: 2, active: true },
  { id: 2, idDevice: 1, BOMCode: '1a2', BOMName: 'سوئیچ', BOMNo: 'swe 2ws', BOMNumber: 1, active: true },
  { id: 3, idDevice: 1, BOMCode: '1a3', BOMName: 'پروانه', BOMNo: 'swe 234', BOMNumber: 5, active: true },
  { id: 4, idDevice: 2, BOMCode: '2a1', BOMName: 'کلید', BOMNo: 'swcv fr4', BOMNumber: 4, active: true },
  { id: 5, idDevice: 2, BOMCode: '2a2', BOMName: 'فن', BOMNo: 'swwwe', BOMNumber: 2, active: true },
  { id: 6, idDevice: 15, BOMCode: '15a1', BOMName: 'فن', BOMNo: 'sx vf2', BOMNumber: 9, active: true },
  { id: 7, idDevice: 15, BOMCode: '15a2', BOMName: 'سوئیچ', BOMNo: 'swe de3', BOMNumber: 22, active: true },
  { id: 8, idDevice: 15, BOMCode: '15a3', BOMName: 'پروانه', BOMNo: 'sde3e 22', BOMNumber: 3, active: true },
  { id: 9, idDevice: 15, BOMCode: '15a4', BOMName: 'کلید', BOMNo: 'swe 3s', BOMNumber: 5, active: true },
  { id: 10, idDevice: 15, BOMCode: '15a5', BOMName: 'هیتر', BOMNo: 'swwww', BOMNumber: 1, active: true },
]

// const BOMTableColumns: GridColDef[] = [
//   { field: 'BOMCode', headerName: 'کد', width: 70 },
//   { field: 'BOMName', headerName: 'نام', width: 100 },
//   { field: 'BOMNo', headerName: 'مشخصه فنی', width: 100 },
//   { field: 'BOMNumber', headerName: 'تعداد', width: 50 },
//   { field: 'active', headerName: 'فعال', width: 50 },
// ]
const BOMTableColumns: MUIDataTableColumn[] = [
  { name: 'BOMCode', label: 'کد', options: { filter: true, sort: true, } },
  { name: 'BOMName', label: 'نام', options: { filter: true, sort: true, } },
  { name: 'BOMNo', label: 'مشخصه فنی', options: { filter: true, sort: true, } },
  { name: 'BOMNumber', label: 'تعداد', options: { filter: true, sort: true, } },
  { name: 'active', label: 'فعال', options: { filter: true, sort: true, } },
]

const ServiceData: ServiceType[] = [
  {
    id: 1, title: 'تعمیرات اساسی', kind: { id: 1, text: 'تعمیراتی' }, activity: [
      { id: 1, title: 'تعمیر1' },
      { id: 2, title: 'تعمیر2' },
      { id: 3, title: 'تعویض' },
    ]
  },
  {
    id: 2, title: 'تعویضات اساسی', kind: { id: 1, text: 'تعمیراتی' }, activity: [
      { id: 4, title: 'تعمیر1' },
      { id: 5, title: 'تعمیر2' },
    ]
  },
  {
    id: 3, title: 'بازدید', kind: { id: 2, text: 'پیشگیرانه' }, period: { id: 1, text: 'ساعت' }, duration: 10, activity: [
      { id: 6, title: 'تعمیر1' },
      { id: 7, title: 'تعمیر2' },
      { id: 8, title: 'تعمیر3' },
      { id: 9, title: 'تعویض1' },
    ]
  },
  {
    id: 4, title: 'بازدید اساسی', kind: { id: 2, text: 'پیشگیرانه' }, period: { id: 2, text: 'روز' }, duration: 1, activity: [
      { id: 10, title: 'تعویض2' },
    ]
  },
]
const ListServiceData: ListServiceType[] = [
  { id: 1, title: 'تعمیرات اساسی', kind: 'تعمیراتی' },
  { id: 2, title: 'تعویضات اساسی', kind: 'تعمیراتی' },
  { id: 3, title: 'بازدید', kind: 'پیشگیرانه', period: 'ساعت', duration: 10, },
  { id: 4, title: 'بازدید اساسی', kind: 'پیشگیرانه', period: 'روز', duration: 1, },
]

const ActivityTableColumns: MUIDataTableColumn[] = [
  { name: 'title', label: 'عنوان', options: { filter: true, sort: true, } },
]

const ServiceTableColumns: MUIDataTableColumn[] = [
  { name: 'id', label: 'کد', options: { filter: true, sort: true, } },
  { name: 'title', label: 'عنوان', options: { filter: true, sort: true, } },
  { name: 'kind', label: 'نوع', options: { filter: true, sort: true, } },
  { name: 'period', label: 'دوره زمانی', options: { filter: true, sort: true, } },
  { name: 'duration', label: 'مدت زمان', options: { filter: true, sort: true, } },
]

export { MenuItemData, DeviceData, BOMData, BOMTableColumns, ServiceData, ListServiceData, ActivityTableColumns, ServiceTableColumns }