import React, {useState} from 'react'
import {
 Dialog,
 DialogTitle,
 DialogContent,
 DialogActions,
 Button,
 IconButton,
 Typography,
 TextField,
 Alert,
} from '@mui/material'
import {styled} from '@mui/system'
import {GrClose} from 'react-icons/gr'
import api from '../utils/api'

// Custom styled components
const CustomDialog = styled(Dialog)(({theme}) => ({
 '& .MuiPaper-root': {
  borderRadius: 15,
  padding: theme.spacing(2),
  backgroundColor: '#f5f5f5', // Custom background color
 },
}))

const CustomDialogTitle = styled(DialogTitle)(({theme}) => ({
 display: 'flex',
 justifyContent: 'space-between',
 alignItems: 'center',
 padding: theme.spacing(2),
 backgroundColor: '#3f51b5', // Custom title background color
 color: '#fff', // Custom title color
}))

const CustomDialogContent = styled(DialogContent)(({theme}) => ({
 padding: theme.spacing(2),
}))

const CustomDialogActions = styled(DialogActions)(({theme}) => ({
 padding: theme.spacing(2),
}))

const CloseButton = styled(IconButton)(({theme}) => ({
 color: '#fff',
}))

const CustomButton = styled(Button)(({theme}) => ({
 backgroundColor: '#3f51b5',
 color: '#fff',
 '&:hover': {
  backgroundColor: '#303f9f',
 },
}))

const CustomModal = ({
 open,
 handleClose,
 onSubmit,
 headerText,
 inputFieldLabel,
 textInputVal,
 apiUrl,
}) => {
 const [textInput, setTextInput] = useState('')
 const updateData = async () => {
  try {
   const postData = {
    updatedValue: textInput,
    user_id: localStorage.getItem('user_id'),
   }
   if (textInput === '') {
    alert('There is no change in data!')
   } else {
    const response = await api.post(apiUrl, postData)
    console.log('res', response)
    if (response) {
     alert('Website updated successfully!')
     handleClose()
    }
   }
  } catch (error) {
   console.error('Login failed:', error)
  }
 }
 return (
  <CustomDialog open={open} onClose={handleClose}>
   <CustomDialogTitle>
    {headerText}
    <CloseButton onClick={handleClose}>
     <GrClose />
    </CloseButton>
   </CustomDialogTitle>
   <CustomDialogContent>
    <Typography variant='body1'>
     This is a custom modal dialog with fully customizable options. You can change the styles, add
     forms, and include any content you need.
    </Typography>
    <TextField
     label={inputFieldLabel}
     fullWidth
     margin='normal'
     type='text'
     variant='outlined'
     defaultValue={textInputVal}
     onChange={(e) => {
      setTextInput(e.target.value)
     }}
    />
   </CustomDialogContent>
   <CustomDialogActions>
    <Button onClick={handleClose}>Cancel</Button>
    <CustomButton
     onClick={() => {
      updateData()
     }}
    >
     Save
    </CustomButton>
   </CustomDialogActions>
  </CustomDialog>
 )
}
export default CustomModal
// Example of how to use the CustomModal component
