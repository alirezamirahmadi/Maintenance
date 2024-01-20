import { MUIDataTableColumn } from 'mui-datatables';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import CableIcon from '@mui/icons-material/Cable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BugReportIcon from '@mui/icons-material/BugReport';

import { MenuItemType } from '../Types/BasicType';
import { DeviceType, BOMType, ServiceType, ListServiceType, ProblemType } from '../Types/BaseInfoType';
import {
  NoticeType, ListNoticeType, WorkOrderType, ListWorkOrderType, ActionType, ListActionType,
  ListActivityResultType
} from '../Types/OperationType';

const MenuItemData: MenuItemType[] = [
  { id: 1, title: 'اطلاعات پایه', icon: <ViewComfyIcon fontSize='large' />, subMenu: [{ id: 1, title: 'دستگاه', icon: <CableIcon fontSize='medium' color='inherit' />, href: '/device' }, { id: 2, title: 'سرویس', icon: <ReceiptLongIcon fontSize='medium' color='inherit' />, href: '/service' }, { id: 6, title: 'ایراد', icon: <BugReportIcon fontSize='medium' color='inherit' />, href: '/problem' }] },
  { id: 2, title: 'عملیات', icon: <SelectAllIcon fontSize='large' />, subMenu: [{ id: 3, title: 'اعلان', icon: <NotificationsIcon fontSize='medium' color='inherit' />, href: '/notice' }, { id: 4, title: 'دستورکار', icon: <VerticalSplitIcon fontSize='medium' color='inherit' />, href: '/workorder' }, { id: 5, title: 'عملکرد', icon: <WorkHistoryIcon fontSize='medium' color='inherit' />, href: '/action' }] }
]

const DataTableOptions = {
  // responsive: 'vertical',
  textLabels: {
    body: {
      noMatch: "داده ای جهت نمایش وجود ندارد",
      toolTip: "مرتب سازی",
    },
    pagination: {
      next: "صفحه بعدی",
      previous: "صفحه قبلی",
      rowsPerPage: "تعداد ردیف در هر صفحه",
      displayRows: "از",
    },
    toolbar: {
      search: "جستجو",
      downloadCsv: "دانلود CSV",
      print: "چاپ",
      viewColumns: "مشاهده ستون ها",
      filterTable: "فیلتر جدوب",
    },
    filter: {
      all: "تمام",
      title: "فیلترها",
      reset: "ریست",
    },
    viewColumns: {
      title: "نمایش ستون ها",
      titleAria: "نمایش/عدم نمایش ستون ها",
    },
    selectedRows: {
      text: "سطر انتخاب شده",
      delete: "حذف",
      deleteAria: "حذف سطرهای انتخاب شده",
    },
  }
}

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

const listDeviceNameData = [
  { id: 0, deviceCode: '00', deviceName: 'کارخانه', },
  { id: 1, deviceCode: '11', deviceName: 'سنگ شکن واحد یک', },
  { id: 2, deviceCode: '12', deviceName: 'سنگ شکن واحد دو' },
  { id: 3, deviceCode: '21', deviceName: 'آسیاب واحد یک', },
  { id: 4, deviceCode: '22', deviceName: 'آسیاب واحد دو', },
  { id: 5, deviceCode: '31', deviceName: 'کوره واحد یک', },
  { id: 6, deviceCode: '32', deviceName: 'کوره واحد دو', },
  { id: 7, deviceCode: '111', deviceName: 'سنگ شکن واحد', },
  { id: 8, deviceCode: '121', deviceName: 'سنگ شکن واحد', },
  { id: 9, deviceCode: '211', deviceName: 'آسیاب واحد', },
  { id: 10, deviceCode: '221', deviceName: 'آسیاب واحد', },
  { id: 11, deviceCode: '311', deviceName: 'کوره واحد', },
  { id: 12, deviceCode: '321', deviceName: 'کوره واحد', },
  { id: 13, deviceCode: '2211', deviceName: 'آسیاب', },
  { id: 14, deviceCode: '3111', deviceName: 'کوره', },
  { id: 15, deviceCode: '3211', deviceName: 'کوره', },
  { id: 16, deviceCode: '112', deviceName: 'سنگ نشکن واحد', },
]


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
  { name: 'id', label: 'کد', options: { filter: true, sort: true, display: false } },
  { name: 'title', label: 'عنوان', options: { filter: true, sort: true, } },
  { name: 'kind', label: 'نوع', options: { filter: true, sort: true, } },
  { name: 'period', label: 'دوره زمانی', options: { filter: true, sort: true, } },
  { name: 'duration', label: 'مدت زمان', options: { filter: true, sort: true, } },
]

const ProblemData: ProblemType[] = [
  { id: 1, title: 'باز شدن پیچ' },
  { id: 2, title: 'پاره شدن تسمه' },
  { id: 3, title: 'قطع سیم برق' },
]

const ProblemTableColumns: MUIDataTableColumn[] = [
  { name: 'id', label: 'کد', options: { filter: true, sort: true, display: false } },
  { name: 'title', label: 'عنوان', options: { filter: true, sort: true, } },
]

const NoticeData: NoticeType[] = [
  { id: 1, device: { id: 2, deviceCode: '12', deviceName: 'سنگ شکن واحد دو' }, noticeDate: '1402/01/12', description: 'تست', problem: [{ id: 1, title: 'باز شدن پیچ' }] },
  { id: 2, device: { id: 3, deviceCode: '21', deviceName: 'آسیاب واحد یک', }, noticeDate: '1402/02/13', problem: [{ id: 1, title: 'باز شدن پیچ' }, { id: 3, title: 'قطع سیم برق' }] },
]

const ListNoticeData: ListNoticeType[] = [
  { id: 1, deviceName: 'سنگ شکن واحد دو', noticeDate: '1402/01/12', description: 'تست' },
  { id: 2, deviceName: 'آسیاب واحد یک', noticeDate: '1402/02/13' },
]

const NoticeTableColumns: MUIDataTableColumn[] = [
  { name: 'id', label: 'کد', options: { filter: true, sort: true, display: false } },
  { name: 'deviceName', label: 'نام دستگاه', options: { filter: true, sort: true, } },
  { name: 'noticeDate', label: 'تاریخ', options: { filter: true, sort: true } },
  { name: 'description', label: 'توضیحات', options: { filter: true, sort: true } },
]

const WorkOrderData: WorkOrderType[] = [
  { id: 1, device: { id: 2, deviceCode: '12', deviceName: 'سنگ شکن واحد دو' }, service: { id: 1, title: 'تعمیرات اساسی', kind: 'تعمیراتی' }, startDate: '1402/01/02', endDate: '1402/02/03', description: 'test', },
  { id: 2, device: { id: 3, deviceCode: '21', deviceName: 'آسیاب واحد یک', }, service: { id: 3, title: 'بازدید', kind: 'پیشگیرانه', period: 'ساعت', duration: 10, }, startDate: '1402/05/02', endDate: '1402/06/03', },
]

const ListWorkOrderData: ListWorkOrderType[] = [
  { id: 1, device: 'سنگ شکن واحد دو', service: 'تعمیرات اساسی', startDate: '1402/01/02', endDate: '1402/02/03', description: 'test', },
  { id: 2, device: 'آسیاب واحد یک', service: 'بازدید', startDate: '1402/05/02', endDate: '1402/06/03', },
]

const WorkOrderTableColumns: MUIDataTableColumn[] = [
  { name: 'id', label: 'کد', options: { filter: true, sort: true, display: false } },
  { name: 'device', label: 'نام دستگاه', options: { filter: true, sort: true, } },
  { name: 'service', label: 'سرویس', options: { filter: true, sort: true, } },
  { name: 'startDate', label: 'تاریخ شروع', options: { filter: true, sort: true } },
  { name: 'endDate', label: 'تاریخ پایان', options: { filter: true, sort: true } },
  { name: 'description', label: 'توضیحات', options: { filter: true, sort: true } },
]

const ActionData: ActionType[] = [
  {
    id: 1,
    workorder: { id: 1, device: { id: 2, deviceCode: '12', deviceName: 'سنگ شکن واحد دو' }, service: { id: 1, title: 'تعمیرات اساسی', kind: 'تعمیراتی' }, startDate: '1402/01/02', endDate: '1402/02/03', description: 'test', },
    startDate: '1402/01/03', endDate: '1402/02/03',
    activityResult:
      [
        { id: 1, activity: { id: 1, title: 'تعمیر1' }, isDo: true, },
        { id: 2, activity: { id: 2, title: 'تعمیر2' }, isDo: false, description: 'test1', },
        { id: 3, activity: { id: 3, title: 'تعویض' }, isDo: true, description: 'test2', },
      ],
    description: 'temp',
  },
  {
    id: 2,
    workorder: { id: 2, device: { id: 3, deviceCode: '21', deviceName: 'آسیاب واحد یک', }, service: { id: 3, title: 'بازدید', kind: 'پیشگیرانه', period: 'ساعت', duration: 10, }, startDate: '1402/05/02', endDate: '1402/06/03', },
    startDate: '1402/05/03', endDate: '1402/06/03',
    activityResult:
      [
        { id: 4, activity: { id: 6, title: 'تعمیر1' }, isDo: true, description: 'test3', },
        { id: 5, activity: { id: 7, title: 'تعمیر2' }, isDo: true, },
        { id: 6, activity: { id: 8, title: 'تعمیر3' }, isDo: false, description: 'test4', },
        { id: 7, activity: { id: 9, title: 'تعویض1' }, isDo: false, },
      ],
  },
]

const ListActionData: ListActionType[] = [
  { id: 1, idWorkOrder: 1, device: 'سنگ شکن واحد دو', service: 'تعمیرات اساسی', startDate: '1402/01/02', endDate: '1402/02/03', description: 'test', },
  { id: 2, idWorkOrder: 2, device: 'آسیاب واحد یک', service: 'بازدید', startDate: '1402/05/02', endDate: '1402/06/03', },
]

const ActionTableColumns: MUIDataTableColumn[] = [
  { name: 'id', label: 'کد', options: { filter: true, sort: true, display: false } },
  { name: 'idWorkOrder', label: 'شماره دستورکار', options: { filter: true, sort: true, } },
  { name: 'device', label: 'نام دستگاه', options: { filter: true, sort: true, } },
  { name: 'service', label: 'سرویس', options: { filter: true, sort: true, } },
  { name: 'startDate', label: 'تاریخ شروع', options: { filter: true, sort: true } },
  { name: 'endDate', label: 'تاریخ پایان', options: { filter: true, sort: true } },
  { name: 'description', label: 'توضیحات', options: { filter: true, sort: true } },
]

const ActivityResultTableColumns: MUIDataTableColumn[] = [
  { name: 'id', label: 'کد', options: { filter: true, sort: true, display: false } },
  { name: 'idAction', label: 'کد عملکرد', options: { filter: true, sort: true, display: false } },
  { name: 'activity', label: 'فعالیت', options: { filter: true, sort: true, } },
  { name: 'isDo', label: 'انجام شد؟', options: { filter: true, sort: true, } },
  { name: 'description', label: 'توضیحات', options: { filter: true, sort: true } },
]

const ListActivityResultData:ListActivityResultType[] = [
  { id: 1, idAction:1, activity: 'تعمیر1', isDo: true, },
  { id: 2, idAction:1, activity: 'تعمیر2', isDo: false, description: 'test1', },
  { id: 3, idAction:1, activity: 'تعویض', isDo: true, description: 'test2', },
  { id: 4, idAction:2, activity: 'تعمیر1', isDo: true, description: 'test3', },
  { id: 5, idAction:2, activity: 'تعمیر2', isDo: true, },
  { id: 6, idAction:2, activity: 'تعمیر3', isDo: false, description: 'test4', },
  { id: 7, idAction:2, activity: 'تعویض1', isDo: false, },
]



export {
  MenuItemData, DeviceData, listDeviceNameData, BOMData, BOMTableColumns, ServiceData, ListServiceData,
  ActivityTableColumns, ServiceTableColumns, ProblemData, ProblemTableColumns, DataTableOptions,
  NoticeData, ListNoticeData, NoticeTableColumns, WorkOrderData, ListWorkOrderData, WorkOrderTableColumns,
  ActionData, ListActionData, ActionTableColumns, ActivityResultTableColumns, ListActivityResultData
}