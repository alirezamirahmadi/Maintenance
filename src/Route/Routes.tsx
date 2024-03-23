import Home from "../Pages/Home/Home";
import Device from "../Pages/BaseInfo/Device/Device";
import Service from "../Pages/BaseInfo/Service/Service";
import Notice from "../Pages/Operation/Notice/Notice";
import WorkOrder from "../Pages/Operation/WorkOrder/WorkOrder";
import Action from "../Pages/Operation/Action/Action";
import Problem from "../Pages/BaseInfo/Problem/Problem";
import NotFound from "../Pages/notFound/NotFound";
import Login from "../Pages/login/Login";

const routes = (isLogin: boolean) => [
  { path: '/login', element: !isLogin ? <Login /> : <NotFound isLogin={isLogin} /> },
  { path: '/', element: isLogin ? <Home /> : <NotFound isLogin={isLogin} /> },
  { path: '/device', element: isLogin ? <Device /> : <NotFound isLogin={isLogin} /> },
  { path: '/device/:idDevice', element: isLogin ? <Device /> : <NotFound isLogin={isLogin} /> },
  { path: '/service', element: isLogin ? <Service /> : <NotFound isLogin={isLogin} /> },
  { path: '/service/:idService', element: isLogin ? <Service /> : <NotFound isLogin={isLogin} /> },
  { path: '/problem', element: isLogin ? <Problem /> : <NotFound isLogin={isLogin} /> },
  { path: '/problem/:idProblem', element: isLogin ? <Problem /> : <NotFound isLogin={isLogin} /> },
  { path: '/notice', element: isLogin ? <Notice /> : <NotFound isLogin={isLogin} /> },
  { path: '/notice/:idNotice', element: isLogin ? <Notice /> : <NotFound isLogin={isLogin} /> },
  { path: '/workorder', element: isLogin ? <WorkOrder /> : <NotFound isLogin={isLogin} /> },
  { path: '/workorder/:idWorkOrder', element: isLogin ? <WorkOrder /> : <NotFound isLogin={isLogin} /> },
  { path: '/action', element: isLogin ? <Action /> : <NotFound isLogin={isLogin} /> },
  { path: '/action/:idAction', element: isLogin ? <Action /> : <NotFound isLogin={isLogin} /> },
  { path: '/*', element: <NotFound isLogin={isLogin} /> }
]

export default routes;