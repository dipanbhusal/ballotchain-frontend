import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from '@material-ui/core'
import Alert from '@mui/material/Alert'

import { useHistory } from 'react-router'

import instance from '../Axios/axios'
import credentials from '../../credentials.json'
import { encrypt } from '../Axios/axios'
import Logo from '../icon.png'
import './main.css'
import { loginUser, useAuthState, useAuthDispatch } from '../Context/index'

const Login = (props) => {
  const [email, setEmail] = useState(null)
  const [citzn, setCitzn] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null)

  const paperStyle = {
    padding: 20,
    height: '73vh',
    width: 300,
    margin: '50px auto',
  }
  const AES_KEY = credentials[0]['AES_KEY']
  const history = useHistory()

  // const csrftoken = getCookie('csrftoken')
  const dispatch = useAuthDispatch()
  const { token, user, loading, errorMessage } = useAuthState()

  useEffect(() => {}, [token])

  const submitForLogin = async (e) => {
    e.preventDefault()
    const data = new FormData()
    data.append('citizenship_no', citzn)
    data.append('email', email)
    data.append('password', password)
    try {
      let response = await loginUser(dispatch, data)
      console.log(token)
      if (token) {
        console.log('yyy')
        props.history.push('/') //navigate to dashboard on success
      }
    } catch (error) {
      console.log(error)
      console.log(error.response.data)
      let message = error.response.data.message
      setMessage(message)
    }
  }

  const btnstyle = { margin: '8px 0', backgroundColor: '#35425D' }
  return (
    <>
      <div className="main-background"></div>
      <div className="main-body">
        <form onSubmit={submitForLogin}>
          <Grid>
            <Paper style={paperStyle}>
              <Grid align="center">
                <img src={Logo} style={{ width: '100px' }} />
                <h3 style={{ marginTop: '-10px' }}>BallotChain</h3>
                <h2>Sign In</h2>
              </Grid>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <TextField
                label="Citizenship Number"
                placeholder="Enter citizenship number"
                fullWidth
                required
                onChange={(e) => setCitzn(e.target.value)}
              />
              <TextField
                label="Email"
                placeholder="Enter Email"
                type="email"
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Password"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={btnstyle}
                fullWidth
              >
                Sign in
              </Button>
              <Typography>
                <Link href="#">Forgot password ?</Link>
              </Typography>
              <Typography>
                {' '}
                Do you have an account ?<Link href="#">Sign Up</Link>
              </Typography>
            </Paper>
          </Grid>
        </form>
      </div>
    </>
  )
}

export default Login
