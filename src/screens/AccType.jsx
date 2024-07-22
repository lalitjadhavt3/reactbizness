import React, {useEffect, useState} from 'react'
import logo from '../assets/logo.png'
import {FaEye, FaEyeSlash} from 'react-icons/fa6'
import '../styles/register.css'
import {
 FormControl,
 IconButton,
 InputAdornment,
 InputLabel,
 OutlinedInput,
 Select,
 MenuItem,
} from '@mui/material'
import {MdOutlineVisibilityOff, MdVisibility} from 'react-icons/md'
import CustomButton from '../components/CustomButton'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import api from '../utils/api'
import Stepper from '../components/Stepper'
import NavigationHeader from '../components/NavigationHeader'

const AccType = () => {
 const MySwal = withReactContent(Swal)
 const [currentStep, setCurrentStep] = useState(0)
 const totalSteps = 1

 const [values, setValues] = useState({
  accType: '',
 })
 const [errors, setErrors] = useState({})
 const navigate = useNavigate()

 const handleChange = (e) => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  })
 }

 const validate = () => {
  let tempErrors = {}

  if (!values.accType) tempErrors.gender = 'Gender is required'
  return tempErrors
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  const tempErrors = validate()
  setErrors(tempErrors)
  if (Object.keys(tempErrors).length === 0) {
   // Handle form submission
   try {
    const postData = {
     accType: values.accType,
     user_id: localStorage.getItem('user_id'),
    }
    console.log('postdata', postData)
    const response = await api.post('/user_acc_type.php', postData)

    if (response?.data?.status?.success) {
     if (response?.data?.status?.description == 'info_added') {
      navigate('/registration/personal-info')
     } else if (response?.data?.status?.description == 'info_updated') {
      navigate('/registration/personal-info')
     }
    } else {
     console.error('Unable to store User Information :', response.data.message)
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     title: 'ERR-1002 Unable to store User Information, Please Try after sometime',
    })
   }
  }
 }

 return (
  <div className='container'>
   <div className='register-box'>
    <NavigationHeader currentStep={currentStep} />
    <div style={{textAlign: 'center', marginTop: '5%'}}>
     <h4>Account Type </h4>
     <Stepper currentStep={currentStep + 1} totalSteps={totalSteps} />
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      <FormControl className='formControl' error={!!errors.accType}>
       <label htmlFor='accType' className='formLabel'>
        Account Type
       </label>
       <Select
        labelId='accType'
        value={values.accType}
        onChange={handleChange}
        name='accType'
        inputProps={{
         id: 'accType-select',
        }}
       >
        <MenuItem value=''>
         <em>Select Account Type</em>
        </MenuItem>
        <MenuItem key={2} value='business'>
         Business
        </MenuItem>
        <MenuItem key={3} value='personal'>
         Personal
        </MenuItem>
       </Select>
       {errors.accType && <span className='error-text'>{errors.accType}</span>}
      </FormControl>
     </div>
     <div className='button-box'>
      <CustomButton
       btnText={'Next'}
       logoIcon={null}
       iconPosition={'start'}
       btnType={'submit'}
       btnStyle={{backgroundColor: 'black'}}
      />
     </div>
    </form>
   </div>
  </div>
 )
}

export default AccType
