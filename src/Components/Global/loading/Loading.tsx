import { FadeLoader } from "react-spinners";
import { useTheme } from "@mui/material";

export default function Loading(): React.JSX.Element {
  
  const theme = useTheme();

  return (
    <>
      <div className="w-fit mx-auto my-auto">
        <FadeLoader color={theme.palette.primary.main} />
      </div>
    </>
  )
}