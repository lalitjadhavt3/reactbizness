import React, {useState} from 'react'
import {FormControl, OutlinedInput} from '@mui/material'
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
      navigate('/registration/business-contact') // Replace '/registration/next-step' with the actual next step route
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
   <div className='register-box'>
    <NavigationHeader currentStep={currentStep} />
    <Stepper totalSteps={totalSteps} currentStep={currentStep} />
    <div>
     <h4>Business Website</h4>
     <label style={{fontSize: 14, marginTop: '3%'}}>Provide Your Business Website (if any).</label>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      <label htmlFor='businessWebsite' className='formLabelBusinessInfo'>
       Business Website (optional)
      </label>
      <FormControl
       variant='outlined'
       className='formCustomControls personal-info-form'
       error={!!errors.businessWebsite}
      >
       <OutlinedInput
        id='outlined-adornment-businessWebsite'
        type='url'
        name='businessWebsite'
        value={values.businessWebsite}
        onChange={handleChange}
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
       btnStyle={{backgroundColor: 'black'}}
      />
     </div>
    </form>
   </div>
  </div>
 )
}

export default BusinessWebsite
