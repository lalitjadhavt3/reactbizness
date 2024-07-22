import React, {useState, useEffect} from 'react'
import {FormControl, InputLabel, OutlinedInput, Select, MenuItem} from '@mui/material'
import CustomButton from '../components/CustomButton'
import '../styles/register.css'
import {useNavigate} from 'react-router-dom'
import api from '../utils/api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import Stepper from '../components/Stepper'
import NavigationHeader from '../components/NavigationHeader'

const BusinessInfo = () => {
 const navigate = useNavigate()
 const MySwal = withReactContent(Swal)
 const [values, setValues] = useState({
  businessName: '',
  businessType: '',
 })
 const [errors, setErrors] = useState({})
 const [currentStep, setCurrentStep] = useState(2)
 const totalSteps = 5
 const [businessTypes, setBusinessTypes] = useState([
  'Sole Proprietorship Firm',
  'Partnership Firms',
  'Societies/Association / Clubs',
  'Hindu Undivided Family (HUF)',
  'Trusts',
  'Unincorporated association or body of individuals',
  'Executors, Administrators and Liquidators',
  'Govt. Authorities and Juridical Persons',
 ])

 useEffect(() => {
  const checkBusinessInfo = async () => {
   try {
    const postData = {
     user_id: localStorage.getItem('user_id'),
    }

    const response = await api.post('/get_user_details_with_page.php', postData)
    if (response?.data?.status?.description) {
     const {business_name, business_type} = response?.data?.data?.user_info
     setValues({
      ...values,
      businessName: business_name,
      businessType: business_type,
     })
     localStorage.setItem('businessName', business_name)
     // Optionally, redirect or update UI to indicate successful login
    }
   } catch (error) {
    MySwal.fire({
     icon: 'error',
     text: 'ERR-1001 Login failed, Please contact administrator',
    }).then(() => {})
   }
  }
  checkBusinessInfo()
 }, [])

 const handleChange = (e) => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  })
 }

 const validate = () => {
  let tempErrors = {}
  if (!values.businessName) tempErrors.businessName = 'Business name is required'
  if (!values.businessType) tempErrors.businessType = 'Business type is required'

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
     businessName: values.businessName,
     businessType: values.businessType,
     user_id: localStorage.getItem('user_id'),
    }
    const response = await api.post('/user_business_info.php', postData)
    if (response?.data?.status?.success) {
     if (
      response?.data?.status?.description == 'info_added' ||
      response?.data?.status?.description == 'info_updated'
     ) {
      localStorage.setItem('businessName', values.businessName)
      navigate('/registration/business-category')
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
     <h4>Business Information</h4>
     <label style={{fontSize: 14, marginTop: '3%'}}>Fill In Your Business Details.</label>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      <label htmlFor='businessName' className='formLabelBusinessInfo'>
       Business Name
      </label>
      <FormControl
       variant='outlined'
       className='formCustomControls personal-info-form'
       error={!!errors.businessName}
      >
       <OutlinedInput
        id='outlined-adornment-businessName'
        type='text'
        name='businessName'
        value={values.businessName}
        onChange={handleChange}
        required
       />
       {errors.businessName && <div className='error-message'>{errors.businessName}</div>}
      </FormControl>

      <label htmlFor='businessType' className='formLabelBusinessInfo'>
       Business Type
      </label>
      <FormControl
       variant='outlined'
       className='formCustomControls personal-info-form'
       error={!!errors.businessType}
      >
       <Select
        id='outlined-adornment-businessType'
        name='businessType'
        value={values.businessType}
        onChange={handleChange}
        required
        placeholder='Select Business Type'
       >
        <MenuItem>
         <em>None</em>
        </MenuItem>
        {businessTypes.map((type, index) => (
         <MenuItem key={index} value={type}>
          {type}
         </MenuItem>
        ))}
       </Select>
       {errors.businessType && <div className='error-message'>{errors.businessType}</div>}
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

export default BusinessInfo
