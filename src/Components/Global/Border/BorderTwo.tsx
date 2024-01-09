import { Divider, Typography } from '@mui/material'

export default function BorderTwo({title}:{title:string}):React.JSX.Element {
  return (
    <>
      <Typography variant='h6'>{title}</Typography>
      <Divider variant='middle' sx={{ marginTop: 2 }} />
    </>
  )
}