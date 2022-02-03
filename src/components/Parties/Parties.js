import React, { useState, useEffect } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import './parties.css'
import urls from '../Axios/urls'
import axios from '../Axios/axios'
import Loading from '../common/Loading'
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const Parties = () => {
  const [parties, setParties] = useState(null)

  useEffect(() => {
    getParties()
  }, [])

  async function getParties() {
    await axios({
      url: urls.PARTY_LIST,
      method: 'GET',
    })
      .then((response) => {
        console.log(response.data.details)
        setParties(response.data.details)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <div className="party-body">
        <h1>List of Parties</h1>
      </div>
      {parties ? (
        parties.map((each) => {
          return (
            <Paper sx={{ p: 3, my: 2, mx: 'auto', maxWidth: 900, flexGrow: 3 }}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="candidate image" src={each.logo_url} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="h2"
                      >
                        {each.name}
                      </Typography>
                      {/* <Typography variant="body2" gutterBottom>
                        Votes: {each.vote_count}
                      </Typography> */}
                      <Typography variant="body2" color="text.secondary">
                        {each.description}
                      </Typography>
                    </Grid>
                    {/* <Grid item>
                      <Typography variant="body2">Agenda</Typography>
                    </Grid> */}
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" component="div">
                      Votes: {each.vote_count}
                    </Typography>
                  </Grid>
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

export default Parties
