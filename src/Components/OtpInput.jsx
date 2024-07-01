import {TextField} from '@mui/material'

const OtpInput = ({value, onChange}) => (
 <TextField
  value={value}
  onChange={onChange}
  inputProps={{maxLength: 6, inputMode: 'numeric', pattern: '[0-9]*'}}
  placeholder='Enter 6-digit OTP'
  variant='outlined'
  fullWidth
 />
)
export default OtpInput
