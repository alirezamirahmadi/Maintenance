import Home from "../Pages/Home/Home";
import Device from "../Pages/BaseInfo/Device/Device";
import Service from "../Pages/BaseInfo/Service/Service";
import Notice from "../Pages/Operation/Notice/Notice";
import WorkOrder from "../Pages/Operation/WorkOrder/WorkOrder";
import Action from "../Pages/Operation/Action/Action";
import Problem from "../Pages/BaseInfo/Problem/Problem";

const routes = (isLogin:boolean) => [
  {path:'/', element:<Home/>},
  {path:'/device', element:<Device/>},
  {path:'/device/:idDevice', element:<Device/>},
  {path:'/service', element:<Service/>},
  {path:'/service/:idService', element:<Service/>},
  {path:'/problem', element:<Problem/>},
  {path:'/problem/:idProblem', element:<Problem/>},
  {path:'/notice', element:<Notice/>},
  {path:'/notice/:idNotice', element:<Notice/>},
  {path:'/workorder', element:<WorkOrder/>},
  {path:'/workorder/:idWorkOrder', element:<WorkOrder/>},
  {path:'/action', element:<Action/>},
  {path:'/action/:idAction', element:<Action/>},
]

export default routes;