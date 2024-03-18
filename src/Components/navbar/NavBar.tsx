import { IconButton, useTheme } from "@mui/material"
import { useCookies } from "react-cookie";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useDispatch } from "react-redux";

import { AppDispatch } from "../../Redux/Store";
import { change } from "../../Redux/Reducer/ModeReducer";

export default function NavBar(): React.JSX.Element {

  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const [cookies, setCookie,] = useCookies(['darkmode']);

  const colorMode = () => {
    const mode = String(cookies.darkmode) === 'light' ? 'dark' : 'light';
    setCookie("darkmode", mode);
    dispatch(change(mode));
  }

  return (
    <>
      <div className="flex items-center w-full">
        <div className="flex justify-between items-center w-full">
          <p className="text-2xl">نگهداری و تعمیرات</p>
          <div className="flex">
            <IconButton onClick={colorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </div>
        </div>
      </div>
    </>
  )
}