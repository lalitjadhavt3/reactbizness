import React, {useState, useEffect} from 'react'
import {FormControl, Autocomplete, TextField, InputAdornment, InputLabel} from '@mui/material'
import {MdBusiness} from 'react-icons/md' // Business icon for adornment
import CustomButton from '../components/CustomButton'
import '../styles/register.css'
import {useNavigate} from 'react-router-dom'
import api from '../utils/api'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import Stepper from '../components/Stepper'
import NavigationHeader from '../components/NavigationHeader'

const BusinessCategory = () => {
 const navigate = useNavigate()
 const MySwal = withReactContent(Swal)
 const [businessCategories, setBusinessCategories] = useState([])
 const [values, setValues] = useState({
  businessCategory: '',
 })
 const [errors, setErrors] = useState({})
 const [currentStep, setCurrentStep] = useState(3)
 const totalSteps = 5

 useEffect(() => {
  const fetchCategories = async () => {
   try {
    const response = await api.get('/get_categories.php')
    const catData = response?.data?.data.map((item) => item.category_name)
    setBusinessCategories(catData)
   } catch (error) {
    console.error('Error fetching categories:', error)
   }
  }
  fetchCategories()
 }, [])

 const handleCategoryChange = (event, newValue) => {
  setValues({
   ...values,
   businessCategory: newValue || event.target.value,
  })
 }

 const validate = () => {
  let tempErrors = {}
  if (!values.businessCategory) tempErrors.businessCategory = 'Business category is required'
  return tempErrors
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  const tempErrors = validate()
  setErrors(tempErrors)
  if (Object.keys(tempErrors).length === 0) {
   try {
    const postData = {
     businessCategory: values.businessCategory,
     user_id: localStorage.getItem('user_id'),
    }
    const response = await api.post('/user_business_info.php', postData)
    if (response?.data?.status?.success) {
     if (
      response?.data?.status?.description == 'info_added' ||
      response?.data?.status?.description == 'info_updated'
     ) {
      localStorage.setItem('businessCategory', values.businessCategory)
      navigate('/registration/business-location')
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
     <h4>Business Category</h4>
     <Stepper totalSteps={totalSteps} currentStep={currentStep} />

     <label className='labelForForm'>Select Your Business Category.</label>
    </div>
    <form onSubmit={handleSubmit}>
     <div className='form-box form-card'>
      <FormControl
       variant='outlined'
       className='formCustomControls personal-info-form'
       error={!!errors.businessCategory}
      >
       <Autocomplete
        freeSolo
        options={businessCategories}
        value={values.businessCategory}
        onChange={handleCategoryChange}
        onInputChange={(event, newInputValue) => {
         setValues({...values, businessCategory: newInputValue})
        }}
        renderInput={(params) => (
         <TextField
          {...params}
          id='outlined-adornment-businessCategory'
          name='businessCategory'
          placeholder='Enter your business category'
          value={values.businessCategory}
          onChange={handleCategoryChange}
          required
          error={!!errors.businessCategory}
          helperText={errors.businessCategory}
          InputProps={{
           ...params.InputProps,
          }}
         />
        )}
       />
      </FormControl>
     </div>
     <div className='button-box'>
      <CustomButton
       btnText={'Next'}
       logoIcon={null}
       iconPosition={'start'}
       btnType={'submit'}
       divStyle={{width: '95px', marginTop: '50px'}}
       btnStyle={{backgroundColor: 'black', height: '45px'}}
      />
     </div>
    </form>
   </div>
  </div>
 )
}

export default BusinessCategory
