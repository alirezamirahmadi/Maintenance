import { Typography, Divider } from "@mui/material"

import { BorderOneProp } from "../../../Types/BasicType"
export default function BorderOne(props: BorderOneProp) {

  return (
    <>
      <div className={("pb-4 px-3 my-6 mx-auto shadow-lg rounded-xl ") + props.className} style={{ direction: 'rtl' }}>
        <div dir="rtl" className="flex justify-center mt-2">
          <Typography variant='h6' color='text.primary'>{props.title}</Typography>
        </div>
        {props.title && <Divider variant="middle" sx={{ marginTop: '2px', marginBottom: '15px' }} />}
        <div dir="rtl">
          {props.children}
        </div>
      </div>
    </>
  )
}