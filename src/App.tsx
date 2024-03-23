import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { useCookies } from 'react-cookie';

import type { RootState, AppDispatch } from './Redux/Store'
import routes from './Route/Routes';
import Menu from './Components/Menu/Menu';
import Loading from './Components/Global/loading/Loading';
import '../dist/tailwindOut.css';
import { getLogin } from './Redux/Reducer/LoginReducer';

export default function App(): React.JSX.Element {

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const loginInfo = useSelector((state: RootState) => state.login);
  const router = useRoutes(routes(loginInfo[0]?.isLogin ?? false));
  const [cookies, ,] = useCookies(['token']);

  useEffect(() => {
    dispatch(getLogin(cookies.token)).then(() => setIsLoading(false));
  }, [])

  if (isLoading) {
    return (<div className="mt-20"><Loading /></div>)
  }

  return (
    <>
      {
        loginInfo[0]?.isLogin
          ?
          <Menu>
            {router}
          </Menu>
          :
          <>
            {router}
          </>
      }
    </>
  )
}
