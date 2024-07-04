import React, {useState, useEffect} from 'react'

const LocationFetcher = () => {
 const [location, setLocation] = useState({
  latitude: null,
  longitude: null,
  city: '',
  area: '',
 })
 const [error, setError] = useState('')

 useEffect(() => {
  if (navigator.geolocation) {
   navigator.geolocation.getCurrentPosition(
    (position) => {
     const {latitude, longitude} = position.coords
     setLocation((prevState) => ({
      ...prevState,
      latitude,
      longitude,
     }))
     fetchLocationDetails(latitude, longitude)
    },
    (error) => {
     setError(error.message)
    }
   )
  } else {
   setError('Geolocation is not supported by this browser.')
  }
 }, [])

 const fetchLocationDetails = async (latitude, longitude) => {
  // Using OpenCage Geocoding API as an example
  const apiKey = 'e25b4c09da3846c381e8cf5f8ed50185' // Replace with your OpenCage API key
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`

  try {
   const response = await fetch(url)
   const data = await response.json()
   if (data.results && data.results.length > 0) {
    const details = data.results[0].components
    setLocation((prevState) => ({
     ...prevState,
     city: details.city || details.town || details.village,
     area: details.suburb || details.neighbourhood || details.locality,
    }))
   } else {
    setError('Unable to retrieve location details.')
   }
  } catch (error) {
   setError('Error fetching location details.')
  }
 }

 return (
  <div>
   {error && <p>Error: {error}</p>}
   <h1>Your Location Details</h1>
   <p>Latitude: {location.latitude}</p>
   <p>Longitude: {location.longitude}</p>
   <p>City: {location.city}</p>
   <p>Area: {location.area}</p>
  </div>
 )
}

export default LocationFetcher
