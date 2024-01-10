import Home from "../Pages/Home/Home";
import Device from "../Pages/BaseInfo/Device/Device";
import Service from "../Pages/BaseInfo/Service/Service";
import Notice from "../Pages/Operation/Notice/Notice";
import WorkOrder from "../Pages/Operation/WorkOrder/WorkOrder";
import Action from "../Pages/Operation/Action/Action";

const routes = (isLogin:boolean) => [
  {path:'/', element:<Home/>},
  {path:'/device', element:<Device/>},
  {path:'/device/:idDevice', element:<Device/>},
  {path:'/service', element:<Service/>},
  {path:'/service/:idService', element:<Service/>},
  {path:'/notice', element:<Notice/>},
  {path:'/workOrder', element:<WorkOrder/>},
  {path:'/action', element:<Action/>},
]

export default routes;