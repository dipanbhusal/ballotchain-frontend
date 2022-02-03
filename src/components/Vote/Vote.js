import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { FaVoteYea } from 'react-icons/fa'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import './vote.css'
import Loading from '../common/Loading'

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
})

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const Vote = () => {
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
      <div className="party-body">
        <h1>Voting Page</h1>
      </div>
      {candidates ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {candidates.map((each, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item>
                <Grid container spacing={2}>
                  <Grid item>
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img
                        alt="candidate image"
                        src="/static/images/grid/complex.jpg"
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item xs={9} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="h2"
                        >
                          {each.first_name} {each.last_name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {each.public_key}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {each.description}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button variant="contained" endIcon={<FaVoteYea />}>
                          Vote
                        </Button>
                      </Grid>
                    </Grid>
                    {/* <Grid item>
                              <Typography variant="subtitle1" component="div">
                              $19.00
                              </Typography>
                          </Grid> */}
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default Vote
