import React, {useState, useEffect} from 'react'
import {FormControl, InputLabel, OutlinedInput} from '@mui/material'
import CustomButton from '../components/CustomButton'
import '../styles/register.css'
import {useNavigate} from 'react-router-dom'
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'
import api, {geolocationapikey} from '../utils/api'
import Stepper from '../components/Stepper'
import NavigationHeader from '../components/NavigationHeader'

const BusinessLocation = () => {
 const navigate = useNavigate()
 const MySwal = withReactContent(Swal)
 const [coords, setCoords] = useState()
 const [values, setValues] = useState({
  address: '',
  country: '',
  state: '',
  city: '',
  pinCode: '',
 })
 const [errors, setErrors] = useState('')
 const [geolocationFetched, setGeolocationFetched] = useState(false)
 const [loading, setLoading] = useState(true)

 useEffect(() => {
  const checkBusinessInfo = async () => {
   try {
    const postData = {user_id: localStorage.getItem('user_id')}
    const response = await api.post('/get_user_details_with_page.php', postData)

    if (response?.data?.status?.description) {
     setLoading(true)
     fetchGeolocation()
     setLoading(false)

     const {business_address, business_country, business_area, business_state, business_pincode} =
      response?.data?.data?.user_info
     setValues({
      address: business_address,
      pinCode: business_pincode,
      city: business_area,
      state: business_state,
      country: business_country,
     })

     if (!business_country || !business_state || !business_area || !business_pincode) {
      setLoading(true)
      fetchGeolocation()
      setLoading(false)
     }
    }
   } catch (error) {
    setLoading(false)
    MySwal.fire({
     icon: 'error',
     text: 'ERR-1001 Login failed, Please contact administrator',
    })
   }
  }

  checkBusinessInfo()
 }, [])

 const fetchGeolocation = () => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(
    (position) => {
     const {latitude, longitude} = position.coords
     setCoords(position?.coords)
     fetchLocationDetails(latitude, longitude)
    },
    (error) => {
     console.error(error)
    }
   )
  } else {
   console.error('Geolocation is not supported by this browser.')
  }
 }

 const fetchLocationDetails = async (latitude, longitude) => {
  const apiKey = geolocationapikey
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`

  try {
   const response = await fetch(url)
   const data = await response.json()
   if (data.results && data.results.length > 0) {
    const details = data.results[0].components

    setValues((prevState) => ({
     ...prevState,
     country: prevState.country || details.country,
     state: prevState.state || details.state,
     city: prevState.city || details.state_district,
     pinCode: details.postcode,
    }))
   } else {
    console.error('Unable to retrieve location details.')
   }
  } catch (error) {
   console.error('Error fetching location details.', error)
  }
 }

 const handleChange = (e) => {
  setValues({
   ...values,
   [e.target.name]: e.target.value,
  })
 }

 const validate = () => {
  let tempErrors = {}
  if (!values.address) tempErrors.address = 'Address is required'
  if (!values.country) tempErrors.country = 'Country is required'
  if (!values.state) tempErrors.state = 'State is required'
  if (!values.city) tempErrors.city = 'City is required'
  if (!values.pinCode) tempErrors.pinCode = 'Pin Code is required'
  return tempErrors
 }

 const handleSubmit = async (e) => {
  e.preventDefault()
  const tempErrors = validate()
  setErrors(tempErrors)
  if (Object.keys(tempErrors).length === 0) {
   try {
    const postData = {
     address: values.address,
     country: values.country,
     state: values.state,
     city: values.city,
     pincode: values.pinCode,
     user_id: localStorage.getItem('user_id'),
     coords: coords,
    }
    const response = await api.post('/user_address_info.php', postData)
    if (response?.data?.status?.success) {
     if (
      response?.data?.status?.description === 'info_added' ||
      response?.data?.status?.description === 'info_updated'
     ) {
      navigate('/registration/business-website')
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
   <NavigationHeader currentStep={3} />

   {loading ? (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 500}}>
     <label>Fetching location</label>
    </div>
   ) : (
    <div className='register-box'>
     <div>
      <h4>Business Location</h4>
      <Stepper currentStep={3} totalSteps={5} />
      <label className='labelForForm'>Fill In Your Business Contact Details.</label>
     </div>
     <form onSubmit={handleSubmit}>
      <div className='form-box form-card'>
       {/* Address Field */}
       <FormControl
        variant='outlined'
        className='formCustomControls personal-info-form'
        error={!!errors.address}
       >
        <InputLabel htmlFor='outlined-adornment-address'>Address</InputLabel>
        <OutlinedInput
         id='outlined-adornment-address'
         type='text'
         name='address'
         value={values.address}
         onChange={handleChange}
         label='Address'
         required
        />
        {errors.address && <div className='error-message'>{errors.address}</div>}
       </FormControl>

       {/* Country Field */}
       <FormControl
        variant='outlined'
        className='formCustomControls personal-info-form'
        error={!!errors.country}
       >
        <InputLabel htmlFor='outlined-adornment-country'>Country</InputLabel>
        <OutlinedInput
         id='outlined-adornment-country'
         type='text'
         name='country'
         value={values.country}
         onChange={handleChange}
         label='Country'
         required
        />
        {errors.country && <div className='error-message'>{errors.country}</div>}
       </FormControl>

       {/* State Field */}
       <FormControl
        variant='outlined'
        className='formCustomControls personal-info-form'
        error={!!errors.state}
       >
        <InputLabel htmlFor='outlined-adornment-state'>State</InputLabel>
        <OutlinedInput
         id='outlined-adornment-state'
         type='text'
         name='state'
         value={values.state}
         onChange={handleChange}
         label='State'
         required
        />
        {errors.state && <div className='error-message'>{errors.state}</div>}
       </FormControl>

       {/* City Field */}
       <FormControl
        variant='outlined'
        className='formCustomControls personal-info-form'
        error={!!errors.city}
       >
        <InputLabel htmlFor='outlined-adornment-city'>City</InputLabel>
        <OutlinedInput
         id='outlined-adornment-city'
         type='text'
         name='city'
         value={values.city}
         onChange={handleChange}
         label='City'
         required
        />
        {errors.city && <div className='error-message'>{errors.city}</div>}
       </FormControl>

       {/* Pin Code Field */}
       <FormControl
        variant='outlined'
        className='formCustomControls personal-info-form'
        error={!!errors.pinCode}
       >
        <InputLabel htmlFor='outlined-adornment-pinCode'>Pin Code</InputLabel>
        <OutlinedInput
         id='outlined-adornment-pinCode'
         type='text'
         name='pinCode'
         value={values.pinCode}
         onChange={handleChange}
         label='Pin Code'
         required
        />
        {errors.pinCode && <div className='error-message'>{errors.pinCode}</div>}
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
   )}
  </div>
 )
}

export default BusinessLocation
