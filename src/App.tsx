import { useRoutes } from 'react-router-dom'
import { useSelector } from "react-redux";
import type { RootState } from './Redux/Store'
import '../dist/tailwindOut.css';

import routes from './Route/Routes';
import Menu from './Components/Menu/Menu';

export default function App(): React.JSX.Element {
  const loginInfo = useSelector((state: RootState) => state.login);
  const router = useRoutes(routes(loginInfo.isLogin));

  return (
    <>
      <Menu>
        {router}
      </Menu>
    </>
  )
}
