import { useState } from 'react';
import { useRoutes } from 'react-router-dom'
import { useSelector } from "react-redux";
import type { RootState } from './Redux/Store'
import '../dist/tailwindOut.css';

import routes from './Route/Routes';
import Menu from './Components/Menu/Menu';
import Loading from './Components/Global/loading/Loading';

export default function App(): React.JSX.Element {
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const loginInfo = useSelector((state: RootState) => state.login);
  const router = useRoutes(routes(loginInfo.isLogin));

  if (isLoading) {
    return (<div className="mt-20"><Loading /></div>)
  }

  return (
    <>
      <Menu>
        {router}
      </Menu>
    </>
  )
}
