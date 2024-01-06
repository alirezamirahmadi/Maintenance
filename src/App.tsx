import { useRoutes } from 'react-router-dom'
import { useTheme, Box } from '@mui/material';
import { useSelector } from "react-redux";
import type { RootState } from './Redux/Store'

import '../dist/tailwindOut.css';

import routes from './Route/Routes';


export default function App(): React.JSX.Element {
  const loginInfo = useSelector((state: RootState) => state.login);
  const router = useRoutes(routes(loginInfo.isLogin));
  const theme = useTheme();

  return (
    <>
      <Box sx={{ backgroundColor: theme.palette.secondColor.main }}>
        {router}
      </Box>
    </>
  )
}
