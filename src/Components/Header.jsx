import * as React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import {BsPersonAdd, BsGear, BsNintendoSwitch} from 'react-icons/bs'

import {FaGear} from 'react-icons/fa6'
import {BiLogOut} from 'react-icons/bi'
import {FiLogOut} from 'react-icons/fi'

export default function Header() {
 const [anchorEl, setAnchorEl] = React.useState(null)
 const open = Boolean(anchorEl)
 const handleClick = (event) => {
  setAnchorEl(event.currentTarget)
 }
 const handleClose = () => {
  setAnchorEl(null)
 }
 return (
  <React.Fragment>
   <Box
    sx={{
     display: 'flex',
     alignItems: 'center',
     justifyContent: 'flex-end',
     position: 'sticky',
     zIndex: '100',
    }}
   >
    <Tooltip title='Account settings'>
     <IconButton
      onClick={handleClick}
      size='small'
      sx={{ml: 2}}
      aria-controls={open ? 'account-menu' : undefined}
      aria-haspopup='true'
      aria-expanded={open ? 'true' : undefined}
     >
      <Avatar sx={{width: 32, height: 32}}>L</Avatar>
     </IconButton>
    </Tooltip>
   </Box>
   <Menu
    anchorEl={anchorEl}
    id='account-menu'
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    PaperProps={{
     elevation: 0,
     sx: {
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
      mt: 1.5,
      '& .MuiAvatar-root': {
       width: 32,
       height: 32,
       ml: -0.5,
       mr: 1,
      },
      '&::before': {
       content: '""',
       display: 'block',
       position: 'absolute',
       top: 0,
       right: 14,
       width: 10,
       height: 10,
       bgcolor: 'background.paper',
       transform: 'translateY(-50%) rotate(45deg)',
       zIndex: 0,
      },
     },
    }}
    transformOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
   >
    <MenuItem
     style={{marginLeft: '2%', borderBottom: '2px inset', borderBottomWidth: '2px'}}
     onClick={handleClose}
    >
     Buy Now
    </MenuItem>
    <MenuItem
     style={{marginLeft: '2%', borderBottom: '2px inset', borderBottomWidth: '2px'}}
     onClick={handleClose}
    >
     Analytics
    </MenuItem>
    <MenuItem
     style={{marginLeft: '2%', borderBottom: '2px inset', borderBottomWidth: '2px'}}
     onClick={handleClose}
    >
     View Profile
    </MenuItem>
    <MenuItem
     style={{marginLeft: '2%', borderBottom: '2px inset', borderBottomWidth: '2px'}}
     onClick={handleClose}
    >
     Edit Profile
    </MenuItem>
    <MenuItem
     style={{marginLeft: '2%', borderBottom: '2px inset', borderBottomWidth: '2px'}}
     onClick={handleClose}
    >
     View QR
    </MenuItem>
    <MenuItem
     style={{marginLeft: '2%', borderBottom: '2px inset', borderBottomWidth: '2px'}}
     onClick={handleClose}
    >
     Edit Profile
    </MenuItem>

    <MenuItem onClick={handleClose}>
     Logout    
     <ListItemIcon>
      <FiLogOut fontSize='small' />
     </ListItemIcon>
    </MenuItem>
   </Menu>
  </React.Fragment>
 )
}
