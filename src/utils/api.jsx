import axios from 'axios'
const ENV = 'dev'
const baseURL =
 ENV === 'prod' ? 'https://biznessshelter.in/biznessapi/api/' : 'http://localhost/bizness/api/'
const api = axios.create({
 baseURL: 'http://localhost/bizness/api/', // Replace with your API URL
 headers: {
  'Content-Type': 'application/json',
 },
})

api.interceptors.request.use(
 (config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
   config.headers['Authorization'] = 'Bearer ' + token
  }
  return config
 },
 (error) => {
  return Promise.reject(error)
 }
)

api.interceptors.response.use(
 (response) => {
  return response
 },
 async (error) => {
  const originalRequest = error.config
  if (error.response.status === 401 && !originalRequest._retry) {
   originalRequest._retry = true
   const refreshToken = localStorage.getItem('refresh_token')
   try {
    const response = await api.post('/refresh.php', {
     refresh_token: refreshToken,
    })
    if (response.status === 200) {
     localStorage.setItem('access_token', response.data.access_token)
     api.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
     return api(originalRequest)
    }
   } catch (refreshError) {
    console.error('Token refresh failed:', refreshError)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
   }
  }
  return Promise.reject(error)
 }
)

export default api
