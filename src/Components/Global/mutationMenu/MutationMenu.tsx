import { useState } from 'react';
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LoupeIcon from '@mui/icons-material/Loupe';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Swal from 'sweetalert2';

const ITEM_HEIGHT = 48;

export default function MutationMenu({ handleAction }: { handleAction: (action: string) => void }): React.JSX.Element {

  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleNew = () => {
    handleAction('new');
    handleClose();
  }

  const handleSave = () => {
    handleAction('save');
    handleClose()
  }

  const handleDelete = () => {
    Swal.fire({
      title: 'حذف',
      text: 'آیا تمایل به حذف این مورد را دارید؟',
      icon: 'question',
      confirmButtonText: 'حذف',
      confirmButtonColor: theme.palette.error.main,
      showCancelButton: true,
      cancelButtonText: 'انصراف',
    }).then(res => { res.isConfirmed && handleAction('delete'); })
    handleClose();
  }

  return (
    <>
      <div>
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          }}
        >
          <MenuItem onClick={handleNew} >
            <ListItemText sx={{ direction: 'rtl' }}>جدید</ListItemText>
            <ListItemIcon><LoupeIcon /></ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleSave}>
            <ListItemText sx={{ direction: 'rtl' }}>ذخیره</ListItemText>
            <ListItemIcon><SaveOutlinedIcon /></ListItemIcon>
          </MenuItem>
          <MenuItem onClick={handleDelete}>
            <ListItemText sx={{ direction: 'rtl' }}>حذف</ListItemText>
            <ListItemIcon><DeleteOutlineOutlinedIcon /></ListItemIcon>
          </MenuItem>
        </Menu>
      </div>
    </>
  )
}