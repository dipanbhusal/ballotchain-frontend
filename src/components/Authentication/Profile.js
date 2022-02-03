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

import axios from '../Axios/axios'
import urls from '../Axios/urls'
import Loading from '../common/Loading'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const Profile = () => {
  return (
    <Paper sx={{ p: 3, my: 2, mx: 'auto', maxWidth: 900, flexGrow: 3 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="candidate image" src="/static/images/grid/complex.jpg" />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                ame
              </Typography>
              <Typography variant="body2" gutterBottom>
                key
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description
              </Typography>
            </Grid>
            <TextField
              label="Citizenship Number"
              placeholder="Enter citizenship number"
              fullWidth
              required
              // onChange={(e) => setCitzn(e.target.value)}
            />
          </Grid>
          {/* <Grid item>
          <Typography variant="subtitle1" component="div">
          $19.00
          </Typography>
      </Grid> */}
        </Grid>
      </Grid>
    </Paper>
  )
}

export default Profile
