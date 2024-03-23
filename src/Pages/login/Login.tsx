import { useState, useEffect } from "react";
import { Typography, TextField, Button, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from '../../Redux/Store';
import { getAccount } from "../../Redux/Reducer/AccountReducer";
import { postLogin, getLogin } from "../../Redux/Reducer/LoginReducer";

export default function Login(): React.JSX.Element {

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const account = useSelector((state: RootState) => state.account);
  const [, setCookie,] = useCookies(['token']);
  const [showSnack, setShowSnack] = useState<boolean>(false);
  const [contextSnack, setContextSnack] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const loginHandler = () => {
    dispatch(getAccount(username));
  }

  const showMessage = (message: string) => {
    setContextSnack(message);
    setShowSnack(true);
  }

  useEffect(() => {
    if (account[0].password === password) {
      dispatch(postLogin({ isLogin: true, token: account[0].person.phone, person: account[0].person })).then(() => {
        dispatch(getLogin(account[0].person.phone ?? '0'));
        setCookie('token', account[0].person.phone ?? '0');
        navigate('/');
      })
    }
    else {
      showMessage('نام کاربری و یا رمز عبور نادرست است');
    }
  }, [account])

  return (
    <>
      <div className="flex flex-wrap justify-around items-center mt-4 md:mt-12 lg:mt-28">
        <div className="text-center">
          <img src="../../public/svg/login/login.svg" alt="Login illustration" className="w-96 mx-auto mt-4 lg:mt-8 mb-8 lg:mb-16" />
        </div>
        <div className="flex flex-col items-center gap-2 ">
          <TextField value={username} onChange={(event) => setUsername(event.target.value)} size="small" sx={{ width: 192, mt: 1 }} color="primary" label={<Typography variant="body1" sx={{ display: 'inline' }}>نام کاربری</Typography>} variant="outlined" required />
          <TextField value={password} onChange={(event) => setPassword(event.target.value)} size="small" sx={{ width: 192, mt: 1 }} color="primary" label={<Typography variant="body1" sx={{ display: 'inline' }}>کلمه عبور</Typography>} variant="outlined" required />
          <Button variant="contained" onClick={loginHandler} sx={{ mt: 1, mx: 'auto', display: 'block' }}>ورود</Button>
        </div>
      </div>
      <Snackbar message={contextSnack} autoHideDuration={2000} open={showSnack} onClose={() => setShowSnack(false)} />
    </>
  )
}