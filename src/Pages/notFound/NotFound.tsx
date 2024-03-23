import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function NotFound({ isLogin }: { isLogin: boolean }): React.JSX.Element {

  const navigate = useNavigate();

  const handleGoToHome = () => {
    navigate('/');
  }

  const handleGoToLogin = () => {
    navigate('/login');
  }

  return (
    <>
      <img src="../../../public/svg/notFound/404Error.svg" alt="Not Found" className="w-48 lg:w-96 mx-auto mt-8 lg:mt-16" />
      {
        isLogin ?
          <Button variant="contained" onClick={handleGoToHome} sx={{ mx: 'auto', display: 'block', mt: 5 }}>صفحه اصلی</Button>
          :
          <Button variant="contained" onClick={handleGoToLogin} sx={{ mx: 'auto', display: 'block', mt: 2 }}>ورود</Button>
      }
    </>
  )
}

