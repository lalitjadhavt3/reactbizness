import React, {useState} from 'react'
import {FormControl, InputLabel, OutlinedInput} from '@mui/material'
import CustomButton from '../components/CustomButton'
import '../styles/register.css'
import {useNavigate} from 'react-router-dom'
import api from '../utils/api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import Stepper from '../components/Stepper'
import NavigationHeader from '../components/NavigationHeader'

const BusinessWebsite = () => {
 const navigate = useNavigate()
 const MySwal = withReactContent(Swal)
 const [values, setValues] = useState({
  businessWebsite: '',
 })
 const [errors, setErrors] = useState({})
 const [currentStep, setCurrentStep] = useState(4)
 const totalSteps = 5

 const handleChange = (e) => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  })
 }

 const validate = () => {
  let tempErrors = {}
  // Business website is optional, so no validation required for this field
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
     businessWebsite: values.businessWebsite,
     user_id: localStorage.getItem('user_id'),
    }
    const response = await api.post('/user_business_info.php', postData)
    if (response?.data?.status?.success) {
     if (
      response?.data?.status?.description == 'info_added' ||
      response?.data?.status?.description == 'info_updated'
     ) {
      localStorage.setItem('businessWebsite', values.businessWebsite)
      navigate('/registration/business-contact') // Replace with the actual next step route
     }
    } else {
     console.error('Unable to store User Information :', response.data.message)
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     text: 'ERR-1002 Unable to store User Information, Please Try after sometime',
    })
   }
  }
 }

 return (
  <div className='container'>
   <NavigationHeader currentStep={currentStep} />

   <div className='register-box'>
    <div>
     <h4>Business Website</h4>
     <Stepper totalSteps={totalSteps} currentStep={currentStep} />

     <label className='labelForForm'>Provide Your Business Website (if any).</label>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      {/* Business Website Input */}
      <FormControl
       variant='outlined'
       className='formCustomControls personal-info-form'
       error={!!errors.businessWebsite}
      >
       <InputLabel htmlFor='outlined-adornment-businessWebsite'>
        Business Website (optional)
       </InputLabel>
       <OutlinedInput
        id='outlined-adornment-businessWebsite'
        type='url'
        name='businessWebsite'
        value={values.businessWebsite}
        onChange={handleChange}
        label='Business Website (optional)' // For Material-UI to display label properly inside input
       />
       {errors.businessWebsite && <div className='error-message'>{errors.businessWebsite}</div>}
      </FormControl>
     </div>
     <div className='button-box'>
      <CustomButton
       btnText={'Next'}
       logoIcon={null}
       iconPosition={'start'}
       btnType={'submit'}
       divStyle={{width: '95px', marginTop: '100px'}}
       btnStyle={{backgroundColor: 'black', height: '45px'}}
      />
     </div>
    </form>
   </div>
  </div>
 )
}

export default BusinessWebsite
