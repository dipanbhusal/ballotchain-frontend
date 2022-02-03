import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import './candidates.css'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import Loading from '../common/Loading'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const Candidates = () => {
  const [candidates, setCandidates] = useState(null)

  useEffect(() => {
    getCandidates()
  }, [])

  async function getCandidates() {
    await axios({
      url: urls.CANDIDATE_LIST,
      method: 'GET',
    })
      .then((response) => {
        console.log(response.data.details)
        setCandidates(response.data.details)
        console.log(candidates)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="candidate-body">
        <h1>List of Candidates</h1>
      </div>
      {candidates ? (
        candidates.map((each) => {
          return (
            <Paper sx={{ p: 3, my: 2, mx: 'auto', maxWidth: 900, flexGrow: 3 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img
                      alt="candidate image"
                      src="/static/images/grid/complex.jpg"
                    />
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
                        {each.first_name} {each.last_name}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {each.public_key}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Description
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {' '}
                        Party: {each.party.name}
                      </Typography>
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
          )
        })
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Candidates
