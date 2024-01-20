import { configureStore } from '@reduxjs/toolkit'

import LoginReducer from './Reducer/LoginReducer';
import DeviceReducer from './Reducer/DeviceReducer';
import BOMReducer from './Reducer/BOMReducer';
import ServiceReducer from './Reducer/ServiceReducer';
import ProblemReducer from './Reducer/ProblemReducer';
import NoticeReducer from './Reducer/NoticeReducer';
import WorkOrderReducer from './Reducer/WorkOrderReducer';
import ActionReducer from './Reducer/ActionReducer';

const store = configureStore({
  reducer: {
    login:LoginReducer,
    device:DeviceReducer,
    BOM:BOMReducer,
    service:ServiceReducer,
    problem:ProblemReducer,
    notice:NoticeReducer,
    workorder:WorkOrderReducer,
    action:ActionReducer,
  }
})

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// export type AppDispatch = typeof useDispatch