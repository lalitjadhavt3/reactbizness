import React from 'react'
import './App.css'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import NavigationRouter from './navigation/routes'

// Create a custom theme with adorned element background color
const theme = createTheme({
 typography: {
  allVariants: {
   fontFamily: 'Poppins',
   textTransform: 'none',
  },
 },
 components: {
  MuiButton: {
   styleOverrides: {
    root: {
     borderRadius: 'unset',
    },
   },
  },
  MuiCard: {
   styleOverrides: {
    root: {
     borderRadius: 'unset',
    },
   },
  },
  MuiPaper: {
   styleOverrides: {
    root: {
     borderRadius: 'unset',
    },
   },
  },
  MuiOutlinedInput: {
   styleOverrides: {
    root: {
     '& fieldset': {
      borderRadius: 'unset',
     },
    },
    adornedStart: {
     backgroundColor: '#e8f0fe', // Change to your desired color
    },
    adornedEnd: {
     backgroundColor: '#e8f0fe', // Change to your desired color
    },
   },
  },
  MuiInputAdornment: {
   styleOverrides: {
    root: {
     backgroundColor: '#e8f0fe', // Change to your desired color
     padding: '0 8px', // Optional: add some padding
     borderRadius: '4px', // Optional: add border radius for better appearance
    },
   },
  },
  // Add more component overrides as needed
 },
})

function App() {
 return (
  <ThemeProvider theme={theme}>
   <NavigationRouter />
  </ThemeProvider>
 )
}

export default App
