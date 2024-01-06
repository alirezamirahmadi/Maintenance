import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import CableIcon from '@mui/icons-material/Cable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import NotificationsIcon from '@mui/icons-material/Notifications';
import VerticalSplitIcon from '@mui/icons-material/VerticalSplit';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import { MenuItemType } from '../Types/BasicType';

const MenuItemData:MenuItemType[] = [
  {id:1, title:'اطلاعات پایه', icon:<ViewComfyIcon fontSize='large' color='textColor' /> , subMenu:[{id:1, title:'دستگاه', icon:<CableIcon fontSize='medium' color='inherit'/>, href:''}, {id:2, title:'سرویس', icon:<ReceiptLongIcon fontSize='medium' color='inherit'/>, href:''}]},
  {id:2, title:'عملیات', icon:<SelectAllIcon fontSize='large' color='textColor' />, subMenu:[{id:3, title:'اعلان', icon:<NotificationsIcon fontSize='medium' color='inherit'/>, href:''}, {id:4, title:'دستورکار', icon:<VerticalSplitIcon fontSize='medium' color='inherit'/>, href:''}, {id:5, title:'عملکرد', icon:<WorkHistoryIcon fontSize='medium' color='inherit'/>, href:''}]}
]





export {MenuItemData}