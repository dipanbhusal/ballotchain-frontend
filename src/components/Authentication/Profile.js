import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  ButtonBase,
} from '@material-ui/core'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import Loading from '../common/Loading'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import NativeSelect from '@mui/material/NativeSelect'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@mui/material/Alert'
import { NepaliDatePicker } from 'datepicker-nepali-reactjs'

import unverified from './unverified.svg'
import verified from './verified.png'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const imgClass = {
  height: '30px',
}

const styles = makeStyles({
  formItems: {
    paddingBottom: '15px',
  },
  selection: {
    marginBottom: '15px',
  },
})

const Profile = () => {
  const [election, setElection] = useState(null)
  const [profile, setProfile] = useState(null)
  const [fatherName, setFatherName] = useState('')
  const [gender, setGender] = useState('')
  const [frontImg, setFrontImg] = useState('')
  const [backImg, setBackImg] = useState('')
  const [district, setDistrict] = useState('')
  const [provience, setProvience] = useState('')
  const [municipality, setMuncipality] = useState('')
  const [wardNo, setWardNo] = useState('')
  const [electionChoice, setElectionChoice] = useState(null)
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [dob, setDob] = useState('')

  let user = localStorage.getItem('currentUser')

  const classes = styles()

  const handleChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setElectionChoice(event.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = new FormData()
    data.append('father_name', fatherName)
    data.append('gender', gender)
    data.append('district', district)
    data.append('provience', provience)
    data.append('municipality', municipality)
    data.append('ward_no', wardNo)
    data.append('enrolled_election', electionChoice)
    data.append('user', profile.user)
    data.append('id', profile.id)
    data.append('is_verified', profile.is_verified)
    data.append('citizenship_image_front', frontImg)
    data.append('citizenship_image_back', backImg)
    data.append('date_of_birth', dob)
    console.log('dob', dob)

    await axios({
      url: urls.PROFILE_UPDATE,
      method: 'put',
      data: data,
    })
      .then((response) => {
        setMessage('Profile updated successfully.')
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  useEffect(async () => {
    await axios({
      url: urls.PROFILE,
    }).then((response) => {
      let resp = response.data.details.profile
      setProfile(response.data.details.profile)
      // if (profile !== null) {
      //   console.log('sss::', profile)
      setFatherName(resp.father_name)
      setGender(resp.gender)
      // setFrontImg(resp.citizenship_image_front)
      // setBackImg(resp.citizenship_image_back)
      setDistrict(resp.district)
      setProvience(resp.provience)
      setMuncipality(resp.municipality)
      setWardNo(resp.ward_no)
      setElectionChoice(resp.enrolled_election)
      setDob(resp.date_of_birth)
      console.log(resp)
      user = JSON.parse(localStorage.getItem('currentUser'))
      user['is_verified'] = resp.is_verified
      user = localStorage.setItem('currentUser', JSON.stringify(user))
      // } else {
      //   console.log('noo')
      // }
      console.log(response)
    })
    await axios({
      url: urls.ELECTION_LIST,
    })
      .then((response) => {
        setElection(response.data.details.preparation)
      })
      .catch((error) => {
        errorMsg(error.response.data)
      })
  }, [])

  return (
    <>
      {profile ? (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {message && <Alert severity="success">{message}</Alert>}
          {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          <Paper sx={{ py: 3, my: 2, mx: 'auto', maxWidth: 900, flexGrow: 5 }}>
            <Grid container spacing={5}>
              <Grid item>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  {/* <Img
                    alt="candidate image"
                    src="/static/images/grid/complex.jpg"
                  /> */}
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography
                      gutterBottom
                      variant="subtitle1"
                      component="div"
                    >
                      Profile status:{' '}
                      {profile.is_verified ? (
                        <>
                          <span
                            style={{ fontWeight: 'bold', fontSize: '20px' }}
                          >
                            {' '}
                            Verified{' '}
                          </span>
                          <img src={verified} alt="logo" style={imgClass} />
                        </>
                      ) : (
                        <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
                          {' '}
                          Unverified{' '}
                        </span>
                      )}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Public Key: {profile.public_key}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    ></Typography>
                  </Grid>
                  <Grid>
                    <TextField
                      label="Father's Name"
                      placeholder="Enter father's name"
                      fullWidth
                      defaultValue={profile.father_name}
                      className={classes.formItems}
                      onChange={(e) => setFatherName(e.target.value)}
                    />

                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Gender
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="gender"
                      defaultValue={profile.gender}
                      onChange={(e) => setGender(e.target.value)}
                      className={classes.formItems}
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
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                    <br />
                    <label htmlFor="date">Date Of Birth</label>
                    <NepaliDatePicker
                      placeholder="Select Date Of Birth"
                      defaultDate={profile.date_of_birth}
                      onDateSelect={(value) => setDob(value)}
                    />
                    <br />
                    <Button
                      variant="contained"
                      component="label"
                      className={classes.formItems}
                    >
                      Upload Citizenship Front Image
                      <input
                        type="file"
                        hidden
                        onChange={(e) => setFrontImg(e.target.files[0])}
                      />{' '}
                    </Button>
                    {profile.citizenship_image_front && 'Uploaded'}
                    <br />
                    <br />
                    <Button
                      variant="contained"
                      component="label"
                      className={classes.formItems}
                    >
                      Upload Citizenship Back Image
                      <input
                        type="file"
                        hidden
                        onChange={(e) => setBackImg(e.target.files[0])}
                      />{' '}
                    </Button>
                    {profile.citizenship_image_back && 'Uploaded'}
                    <br />
                    <TextField
                      label="District"
                      placeholder="Enter District"
                      fullWidth
                      className={classes.formItems}
                      defaultValue={profile.district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                    <br />
                    <TextField
                      label="Provience"
                      placeholder="Enter Provience"
                      fullWidth
                      className={classes.formItems}
                      defaultValue={profile.provience}
                      onChange={(e) => setProvience(e.target.value)}
                    />
                    <br />
                    <TextField
                      label="Muncipality"
                      placeholder="Enter Muncipality"
                      fullWidth
                      className={classes.formItems}
                      defaultValue={profile.municipality}
                      onChange={(e) => setMuncipality(e.target.value)}
                    />
                    <br />
                    <TextField
                      type={'number'}
                      label="Ward No."
                      placeholder="Enter Ward No."
                      fullWidth
                      className={classes.formItems}
                      defaultValue={profile.ward_no}
                      onChange={(e) => setWardNo(e.target.value)}
                    />
                    <br />
                    <FormControl fullWidth className={classes.formItems}>
                      {/* <InputLabel id="demo-simple-select-label">
                        Select Election
                      </InputLabel> */}
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Participating Election
                      </InputLabel>
                      <NativeSelect
                        defaultValue={profile.enrolled_election}
                        inputProps={{
                          name: 'age',
                          id: 'uncontrolled-native',
                        }}
                        onChange={handleChange}
                      >
                        <option value={null}>Select election</option>
                        {election &&
                          election.map((each) => {
                            return <option value={each.id}>{each.title}</option>
                          })}
                      </NativeSelect>
                    </FormControl>
                    <br />
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ marginTop: '15px' }}
                    >
                      Update
                    </Button>

                    {/* <Button type="submit" variant="contained" component="label">
                      Update Profile
                    </Button> */}
                  </Grid>
                </Grid>
                {/* <Grid item>
              <Typography variant="subtitle1" component="div">
              $19.00
              </Typography>
          </Grid> */}
              </Grid>
            </Grid>
          </Paper>
        </form>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Profile
