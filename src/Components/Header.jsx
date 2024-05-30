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
import {Link} from 'react-router-dom'

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
    <MenuItem style={{margin: '5% 5%', borderBottom: '2px inset', borderBottomWidth: '2px'}}>
     {' '}
     <Link to={'/pricing'} target='_blank'>
      Buy Now
     </Link>
    </MenuItem>
    <MenuItem style={{margin: '5% 5%', borderBottom: '2px inset', borderBottomWidth: '2px'}}>
     <Link to={'/analytics'} target='_blank'>
      Analytics
     </Link>
    </MenuItem>
    <MenuItem style={{margin: '5% 5%', borderBottom: '2px inset', borderBottomWidth: '2px'}}>
     <Link to={'/profile'}>View Profile</Link>
    </MenuItem>
    <MenuItem style={{margin: '5% 5%', borderBottom: '2px inset', borderBottomWidth: '2px'}}>
     <Link to={'/editProfile/1'}>Edit Profile</Link>
    </MenuItem>
    <MenuItem style={{margin: '5% 5%', borderBottom: '2px inset', borderBottomWidth: '2px'}}>
     {' '}
     <Link to={'/view_qr'}>View QR</Link>
    </MenuItem>
    <MenuItem style={{margin: '5% 5%', borderBottom: '2px inset', borderBottomWidth: '2px'}}>
     {' '}
     <Link to={'/referral'}>Refer & Earn</Link>
    </MenuItem>
    <MenuItem style={{margin: '0% 5%', borderBottom: '2px inset', borderBottomWidth: '2px'}}>
     <Link to={'/login'}>Logout    </Link>
     <ListItemIcon>
      <FiLogOut fontSize='small' />
     </ListItemIcon>
    </MenuItem>
   </Menu>
  </React.Fragment>
 )
}
