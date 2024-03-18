import { configureStore } from '@reduxjs/toolkit'

import LoginReducer from './Reducer/LoginReducer';
import DeviceReducer from './Reducer/DeviceReducer';
import BOMReducer from './Reducer/BOMReducer';
import ServiceReducer from './Reducer/ServiceReducer';
import ProblemReducer from './Reducer/ProblemReducer';
import NoticeReducer from './Reducer/NoticeReducer';
import WorkOrderReducer from './Reducer/WorkOrderReducer';
import ActionReducer from './Reducer/ActionReducer';
import ModeReducer from './Reducer/ModeReducer';

const store = configureStore({
  reducer: {
    login: LoginReducer,
    device: DeviceReducer,
    BOM: BOMReducer,
    service: ServiceReducer,
    problem: ProblemReducer,
    notice: NoticeReducer,
    workorder: WorkOrderReducer,
    action: ActionReducer,
    mode: ModeReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch