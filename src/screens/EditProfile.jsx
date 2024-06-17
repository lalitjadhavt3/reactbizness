import React, {useEffect, useRef, useState} from 'react'
import '../styles/EditProfile.css'
import '../App.css'
import logo from '../assets/logo.png'
import {FaCross, FaEdit, FaGoogle, FaWindowClose} from 'react-icons/fa'
import {FaEye, FaEyeSlash, FaX} from 'react-icons/fa6'
import CustomButton from '../components/CustomButton'
import {
 FormControl,
 IconButton,
 InputAdornment,
 InputLabel,
 Select,
 OutlinedInput,
 TextField,
 MenuItem,
 RadioGroup,
 FormControlLabel,
 Radio,
 FormLabel,
} from '@mui/material'
import {MdOutlineVisibilityOff, MdVisibility} from 'react-icons/md'
import {Link, useParams} from 'react-router-dom'
import Loader from '../components/Loader'
import Header from '../components/Header'
import Footer from '../components/Footer'
import api from '../utils/api'
const EditProfile = () => {
 const id = useParams()
 const [errors, setErrors] = useState({})
 const generateOptions = (start, end) => {
  const options = []
  for (let i = start; i <= end; i++) {
   options.push(
    <MenuItem key={i} value={i}>
     {i}
    </MenuItem>
   )
  }
  return options
 }

 const days = generateOptions(1, 31)
 const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
 ].map((month, index) => (
  <MenuItem key={index + 1} value={index + 1}>
   {month}
  </MenuItem>
 ))

 const handleStateChange = (event) => {
  setState(event.target.value)
 }
 const [data, setData] = useState()
 const years = generateOptions(1940, 2024)
 const [isCountryLoading, setIsCountryLoading] = useState(true)
 const [isLoading, setIsLoading] = useState(true)
 const [userName, setUserName] = useState(null)
 const [email, setEmail] = useState(null)
 const [countryList, setCountryList] = useState([])
 const [stateList, setStateList] = useState([])
 const [businessName, setBusinessName] = useState(null)
 const [day, setDay] = useState(null)
 const [month, setMonth] = useState(null)
 const [year, setYear] = useState(null)
 const [gender, setGender] = useState(null)
 const [businessType, setBusinessType] = useState(null)
 const [businessCategory, setBusinessCategory] = useState(null)
 const [pinCode, setPinCode] = useState(null)
 const [address, setAddress] = useState(null)
 const [area, setArea] = useState(null)
 const [state, setState] = useState(null)
 const [country, setCountry] = useState(null)
 useEffect(() => {
  fetch('https://restcountries.com/v3.1/all')
   .then((response) => response.json())
   .then((data) => {
    const countryList = data.map((country) => ({
     name: country.name.common,
     code: country.cca2,
    }))
    setCountryList(countryList.sort((a, b) => a.name.localeCompare(b.name)))
    setIsCountryLoading(false)
   })
   .catch((error) => {
    const data = [
     {name: {common: 'United States'}, cca2: 'US'},
     {name: {common: 'Canada'}, cca2: 'CA'},
     {name: {common: 'Brazil'}, cca2: 'BR'},
     {name: {common: 'United Kingdom'}, cca2: 'GB'},
     {name: {common: 'France'}, cca2: 'FR'},
     {name: {common: 'Germany'}, cca2: 'DE'},
     {name: {common: 'Australia'}, cca2: 'AU'},
     {name: {common: 'India'}, cca2: 'IN'},
     {name: {common: 'China'}, cca2: 'CN'},
     {name: {common: 'Japan'}, cca2: 'JP'},
     {name: {common: 'South Korea'}, cca2: 'KR'},
     {name: {common: 'Mexico'}, cca2: 'MX'},
     {name: {common: 'Italy'}, cca2: 'IT'},
     {name: {common: 'Spain'}, cca2: 'ES'},
     {name: {common: 'Russia'}, cca2: 'RU'},
    ]
    const countryList = data.map((country) => ({
     name: country.name.common,
     code: country.cca2,
    }))
    setCountryList(countryList.sort((a, b) => a.name.localeCompare(b.name)))
    setIsCountryLoading(false)
   })
 }, [])
 const fetchData = async () => {
  try {
   const postData = {
    username: localStorage.getItem('username'),
    user_id: localStorage.getItem('user_id'),
   }
   const response = await api.post('/get_user_details.php', postData)
   if (response?.data) {
    setData(response?.data?.data[0])
    setBusinessType(response?.data?.data[0]?.business_type)
    setCountry(response?.data?.data[0]?.business_country)
    setState(response?.data?.data[0]?.business_state)
    setMonth(response?.data?.data[0]?.month)
    setDay(response?.data?.data[0]?.day)
    setYear(response?.data?.data[0]?.year)
    setEmail(postData?.username)
    // navigate('/'); // Optionally, redirect or update UI to indicate successful login
   } else {
    console.error('Login failed:', response.data.message)
   }
  } catch (error) {
   console.error('Login failed:', error)
  }
 }
 useEffect(() => {
  fetchData().then(() => {
   setIsLoading(false)
  })
 }, [])
 // Fetch list of states for the selected country
 useEffect(() => {
  setIsCountryLoading(true)
  if (country) {
   fetch('https://countriesnow.space/api/v0.1/countries/states', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({country: country}),
   })
    .then((response) => response.json())
    .then((result) => {
     console.log(result?.data?.states)
     const stateList = result?.data?.states?.map((state) => ({
      name: state.name,
      code: state.state_code,
     }))
     setStateList(stateList)
     setIsCountryLoading(false)
    })
    .catch((error) => console.log('error', error))
  }
 }, [country])

 const handleCountryChange = (event) => {
  setCountry(event.target.value)
  setState('')
 }

 return (
  <>
   {!isLoading ? (
    <div>
     {!isCountryLoading ? (
      <div className='container'>
       <div
        style={{
         position: 'fixed',
         zIndex: '200',
         right: '4%',
         top: '2%',
        }}
       >
        <Header />
       </div>
       <div className='profilebox'>
        <Link to={'/'} style={{marginBottom: '6%', display: 'flex'}}>
         <FaX />
        </Link>

        <div className='profilebox-header'>
         <div className='imgContainer'>
          <img src={logo} alt='profile pic' className='profileImg' />
         </div>
         <div className='profileinfo'>
          <h1 className='profileTitle'>Profile</h1>
          <p className='profileActiveText'>active since 2023-30-2</p>
         </div>
        </div>
        <div className='profileDetails'>
         <FormControl className='formControl'>
          <label htmlFor='emailId' className='formLabel'>
           Email
          </label>
          <TextField
           variant='outlined'
           id='email'
           disabled
           defaultValue={localStorage.getItem('username')}
           placeholder='Enter Email'
           onChange={(e) => {
            setEmail(e.target.value)
           }}
          />
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='userName' className='formLabel'>
           Name
          </label>
          <TextField
           variant='outlined'
           id='userName'
           defaultValue={data?.name}
           placeholder='Enter User Name'
           onChange={(e) => {
            setUserName(e.target.value)
           }}
          />
         </FormControl>
         <div className='formControl'>
          <label htmlFor='dob' className='formLabel'>
           DOB
          </label>
          <div
           style={{
            justifyContent: 'space-between',
            display: 'flex',
           }}
          >
           <FormControl style={{width: '22%'}}>
            <InputLabel style={{fontSize: '15px'}} id='day'>
             Date
            </InputLabel>

            <Select
             labelId='day'
             value={data?.day}
             onChange={(e) => setDay(e.target.value)}
             label='Day'
             inputProps={{
              name: 'day',
              id: 'day-select',
             }}
            >
             <MenuItem aria-label='None' value='' />
             {days}
            </Select>
           </FormControl>
           <FormControl style={{width: '33%'}}>
            <InputLabel style={{fontSize: '15px'}} id='month'>
             Month
            </InputLabel>

            <Select
             labelId='month'
             value={month}
             onChange={(e) => setMonth(e.target.value)}
             label='Month'
             inputProps={{
              name: 'month',
              id: 'month-select',
             }}
            >
             <MenuItem aria-label='None' value='' />
             {months}
            </Select>
           </FormControl>
           <FormControl style={{width: '25%'}}>
            <InputLabel style={{fontSize: '15px'}} id='year'>
             Year
            </InputLabel>

            <Select
             labelId='year'
             value={data?.year || year}
             onChange={(e) => setYear(e.target.value)}
             label='Year'
             inputProps={{
              name: 'year',
              id: 'year-select',
             }}
            >
             <MenuItem aria-label='None' value='' />
             {years}
            </Select>
           </FormControl>
          </div>
         </div>
         <FormControl className='formControl'>
          <label htmlFor='gender' className='formLabel'>
           Gender
          </label>
          <Select
           labelId='gender'
           value={data?.gender}
           onChange={(e) => setGender(e.target.value)}
           inputProps={{
            name: 'day',
            id: 'day-select',
           }}
          >
           <MenuItem key={0} value={'male'} selected={data?.gender == 'male' ? true : false}>
            Male
           </MenuItem>
           <MenuItem key={1} value={'female'} selected={data?.gender == 'female' ? true : false}>
            Female
           </MenuItem>
          </Select>
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='businessName' className='formLabel'>
           Business Name
          </label>
          <TextField
           variant='outlined'
           id='businessName'
           defaultValue={data?.business_name}
           placeholder='Enter Business Name'
           onChange={(e) => {
            setBusinessName(e.target.value)
           }}
          />
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='businessType' className='formLabel'>
           Business Type
          </label>
          <Select
           labelId='businessType'
           value={businessType}
           onChange={(e) => setBusinessType(e.target.value)}
           inputProps={{
            name: 'day',
           }}
          >
           <MenuItem aria-label='Select Business Type' value='' disabled selected>
            Select Business Type
           </MenuItem>
           <MenuItem value='SOLE PROPRIETORSHIP FIRM'>SOLE PROPRIETORSHIP FIRM</MenuItem>
           <MenuItem value='Partnership Firms'>Partnership Firms</MenuItem>
           <MenuItem value='Societies/Association / Clubs'>Societies/Association / Clubs</MenuItem>
           <MenuItem value='Hindu Undivided Family (HUF)'>Hindu Undivided Family (HUF)</MenuItem>
           <MenuItem value='Trusts'>Trusts</MenuItem>
           <MenuItem value='Unincorporated association or body of individuals'>
            Unincorporated association or body of individuals
           </MenuItem>
           <MenuItem value='Executors, Administrators and Liquidators'>
            Executors, Administrators and Liquidators
           </MenuItem>
           <MenuItem value='Govt. Authorities and Juridical Persons'>
            Govt. Authorities and Juridical Persons
           </MenuItem>
          </Select>
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='businessCategory' className='formLabel'>
           Business Category
          </label>
          <TextField
           variant='outlined'
           id='businessCategory'
           defaultValue={data?.business_category}
           placeholder='Enter Business Category'
           onChange={(e) => {
            setBusinessCategory(e.target.value)
           }}
          />
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='pincode' className='formLabel'>
           Pincode
          </label>
          <TextField
           variant='outlined'
           id='pincode'
           defaultValue={data?.business_pincode}
           placeholder='Enter Pincode'
           onChange={(e) => {
            setPinCode(e.target.value)
           }}
          />
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='address' className='formLabel'>
           Business Address
          </label>
          <TextField
           variant='outlined'
           id='address'
           defaultValue={data?.business_address}
           placeholder='Enter Business Address'
           onChange={(e) => {
            setAddress(e.target.value)
           }}
          />
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='area' className='formLabel'>
           Business area
          </label>
          <TextField
           variant='outlined'
           id='area'
           defaultValue={data?.business_area}
           placeholder='Enter Business area'
           onChange={(e) => {
            setArea(e.target.value)
           }}
          />
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='businessType' className='formLabel'>
           Country
          </label>
          <Select
           labelId='Country'
           value={country}
           onChange={handleCountryChange}
           inputProps={{
            name: 'Country',
           }}
          >
           <MenuItem aria-label='Select Country' value='' disabled selected>
            Country
           </MenuItem>
           {countryList?.map((item, index) => {
            return (
             <MenuItem key={index} value={item?.name}>
              {item?.name}
             </MenuItem>
            )
           })}
          </Select>
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='stateList' className='formLabel'>
           State
          </label>
          <Select
           labelId='State'
           value={state}
           onChange={handleStateChange}
           inputProps={{
            name: 'State',
           }}
          >
           <MenuItem aria-label='Select Country' value='' disabled selected>
            State
           </MenuItem>
           {stateList?.map((item, index) => {
            return (
             <MenuItem key={index} value={item?.name}>
              {item?.name}
             </MenuItem>
            )
           })}
          </Select>
         </FormControl>
         <FormControl className='formControl'>
          <label htmlFor='deliveryOption' className='formLabel'>
           Provide Deliveries
          </label>
          <RadioGroup row aria-labelledby='deliveryOption' name='row-radio-buttons-group'>
           <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
           <FormControlLabel value='No' control={<Radio />} label='No' />
          </RadioGroup>
         </FormControl>
        </div>
        <CustomButton btnText={'Update'} iconPosition={'start'} />
       </div>
      </div>
     ) : (
      <Loader />
     )}

     <Footer />
    </div>
   ) : (
    <Loader />
   )}
  </>
 )
}

export default EditProfile
