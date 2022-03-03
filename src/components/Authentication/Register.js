import React, { useState } from 'react'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import { useForm } from 'react-hook-form'
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createTheme } from '@material-ui/core/styles'
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import Logo from '../icon.png'
import './main.css'
import { registerUser, useAuthDispatch, useAuthState } from '../Context/index'
import { Link } from 'react-router-dom'
import { Alert } from '@mui/material'

const formLabelsTheme = createTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        paddingBottom: '20px',
      },
      asterisk: {
        color: '#db3131',
        marginLeft: '1px',
        '&$error': {
          color: '#db3131',
        },
      },
    },
  },
})

const Register = (props) => {
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [citizenship, setCitizenship] = useState(null)
  const [email, setEmail] = useState(null)
  const [passwordF, setPasswordF] = useState(null)
  const [passwordS, setPasswordS] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorText, setErrorText] = useState('')
  const dispatch = useAuthDispatch()
  const { token, user, loading, errorMessage } = useAuthState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({})
  const submitForRegister = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('first_name', firstName)
    data.append('last_name', lastName)
    data.append('citizenship_no', citizenship)
    data.append('email', email)
    data.append('password', passwordF)
    data.append('password2', passwordS)
    try {
      console.log(data)
      let response = await registerUser(dispatch, data)
      let reg = localStorage.getItem('reg')
      if (reg == 's') {
        localStorage.removeItem('reg')
        props.history.push({
          pathname: '/login',

          state: {
            message:
              'Registered successfully. Please login to use BallotChain.',
          },
        })
      }
    } catch (error) {
      console.log('2131', error)
      let message = error.message
      setMessage(message)
    }
  }

  const paperStyle = {
    padding: 20,
    width: '73vh',
    margin: '50px auto',
  }
  const headerStyle = { margin: 0 }

  const btnstyle = { margin: '8px 0', backgroundColor: '#35425D' }

  const handleCitizenChange = (e) => {
    {
      console.log(e.target.value)
      if (isNaN(e.target.value))
        setErrorText('Citizenship contains integer only.')
      else {
        setCitizenship(e.target.value)
        setErrorText('')
      }
    }
  }
  const handleTest = (e) => {
    console.log('sasda')
  }
  return (
    <>
      <div className="main-background"></div>
      <div className="main-body">
        <MuiThemeProvider theme={formLabelsTheme}>
          <form onSubmit={(e) => submitForRegister(e)}>
            <Grid container spacing={2}>
              <Paper style={paperStyle}>
                <Grid align="center">
                  <img src={Logo} style={{ width: '100px' }} />
                  <h3 style={{ marginTop: '-10px' }}>BallotChain</h3>
                  <h2>Register</h2>
                </Grid>
                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                <TextField
                  label="First Name"
                  placeholder="Enter First Name"
                  // variant="outlined"
                  fullWidth
                  required
                  onChange={handleTest}
                />
                <TextField
                  label="Last Name"
                  placeholder="Enter Last Name"
                  // variant="outlined"
                  fullWidth
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                  label="Citizenship Number"
                  placeholder="Enter citizenship number"
                  name="citzn"
                  // variant="outlined"
                  fullWidth
                  required
                  // helperText={errors.citzn && 'Only number is allowed'}
                  helperText={errorText}
                  error={errorText}
                  {...register('citzn', {
                    required: true,
                    pattern: {
                      value: /^[0-9]+$/,
                    },
                  })}
                  onChange={(e) => handleCitizenChange(e)}
                />
                <TextField
                  label="Email"
                  placeholder="Enter Email"
                  // variant="outlined"
                  type="email"
                  fullWidth
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                  label="Password"
                  placeholder="Enter password"
                  // variant="outlined"
                  type="password"
                  fullWidth
                  required
                  onChange={(e) => setPasswordF(e.target.value)}
                />
                <TextField
                  label="Confirm Password"
                  placeholder="Confirm password"
                  // variant="outlined"
                  type="password"
                  fullWidth
                  required
                  onChange={(e) => setPasswordS(e.target.value)}
                />

                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  style={btnstyle}
                  fullWidth
                >
                  Register
                </Button>
                <Typography></Typography>
                <Typography>
                  {' '}
                  Already an account ?<Link href="#">Login</Link>
                </Typography>
              </Paper>
            </Grid>
          </form>
        </MuiThemeProvider>
      </div>
    </>
  )
}

export default Register
