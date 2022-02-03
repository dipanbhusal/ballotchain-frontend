import React from 'react'
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from '@material-ui/core'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'

import Logo from '../icon.png'
import './main.css'

const Register = () => {
  const paperStyle = { padding: 20, width: 300, margin: '50px auto' }
  const headerStyle = { margin: 0 }

  const btnstyle = { margin: '8px 0', backgroundColor: '#35425D' }
  return (
    <>
      <div className="main-background"></div>
      <div className="main-body">
        <Grid>
          <Paper style={paperStyle}>
            <Grid align="center">
              <img src={Logo} style={{ width: '100px' }} />
              <h3 style={{ marginTop: '-10px' }}>BallotChain</h3>
              <h2 style={headerStyle}>Register</h2>
              <Typography variant="caption" gutterBottom>
                Please fill this form to create an account !
              </Typography>
            </Grid>
            <form>
              <TextField fullWidth label="Name" placeholder="Enter your name" />
              <TextField
                fullWidth
                label="Email"
                placeholder="Enter your email"
              />
              <FormControl
                component="fieldset"
                className={{ marginButton: '10px' }}
              >
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup
                  aria-label="gender"
                  name="gender"
                  style={{ display: 'initial' }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <TextField
                fullWidth
                label="Phone Number"
                placeholder="Enter your phone number"
              />
              <TextField
                fullWidth
                label="Password"
                placeholder="Enter your password"
              />
              <TextField
                fullWidth
                label="Confirm Password"
                placeholder="Confirm your password"
              />
              <FormControlLabel
                control={<Checkbox name="checkedA" />}
                label="I accept the terms and conditions."
              />
              <Button type="submit" variant="contained" color="primary">
                Register
              </Button>
            </form>
          </Paper>
        </Grid>
      </div>
    </>
  )
}

export default Register
