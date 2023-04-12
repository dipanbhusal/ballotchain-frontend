import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button'
import { FaChartBar, FaVoteYea } from 'react-icons/fa'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import './election.css'
import Loading from '../common/Loading'
import { Link } from 'react-router-dom'
import ElectionResult from './ElectionResult'
import CountdownTimer from './CountdownTimer'

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

const ElectionList = (props) => {
  const [elections, setElections] = useState(null)

  useEffect(async () => {
    await getElections()
  }, [])

  async function getElections() {
    await axios({
      url: urls.ELECTION_LIST,
      method: 'GET',
    })
      .then((response) => {
        setElections(response.data.details)
      })
      .catch((error) => {
        console.log(error.response)
      })
  }

  const returnTime = (time) => {
    let t = new Date(time)
    let dateAgo = `${t.getDate()} ${t.toLocaleString('default', {
      month: 'long',
    })} ${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`
    return dateAgo
  }
  const resultHandler = (election_address) => {
    props.history.push({
      pathname: '/result',
      state: {
        electionAddress: election_address,
      },
    })
  }
  return (
    <>
      {/* <div className="election-body">
        <h1>Election Page</h1>
      </div> */}

      {elections ? (
        <>
          {elections['voting'].length !== 0 && (
            <>
              <div className="election-body">
                <h1>Elections on voting phase</h1>
              </div>

              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {elections['voting'].map((each, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item>
                      <Grid container spacing={3}>
                        <Grid item xs={9} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="h2"
                              >
                                {each.title}
                                {/* {each.first_name} {each.last_name} */}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                <span
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: '-10px',
                                  }}
                                >
                                  Ends At:{' '}
                                </span>{' '}
                                <CountdownTimer time={each.end_time} />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {/* {each.description} */}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              style={
                                {
                                  // marginLeft: '-10px',
                                  // display: 'flex',
                                }
                              }
                            >
                              <Link
                                to={{
                                  pathname: '/vote',
                                  state: {
                                    electionAddress: each.public_key,
                                  },
                                }}
                                style={{
                                  textDecoration: 'none',
                                  marginRight: '1em',
                                }}
                              >
                                <Button variant="contained">Vote</Button>
                              </Link>
                              <Link
                                to={{
                                  pathname: '/election-result',
                                  state: {
                                    electionAddress: each.public_key,
                                  },
                                }}
                                style={{
                                  textDecoration: 'none',
                                }}
                              >
                                <Button
                                  variant="contained"
                                  endIcon={<FaChartBar />}
                                >
                                  Result
                                </Button>
                              </Link>
                            </Grid>
                            <Grid item></Grid>
                          </Grid>
                          {/* <Grid item> */}
                          <svg height="100" width="100" className="blinking">
                            <circle cx="50" cy="10" r="10" fill="#62bd19" />
                          </svg>
                          {/* </Grid> */}
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {elections['preparation'].length !== 0 && (
            <>
              <div className="election-body">
                <h1>Elections on Preparation phase</h1>
              </div>

              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {elections['preparation'].map((each, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Item>
                      <Grid container spacing={3}>
                        <Grid item xs={9} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="h2"
                              >
                                {each.title}
                                {/* {each.first_name} {each.last_name} */}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                <span
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: '-10px',
                                  }}
                                >
                                  Starts At:{' '}
                                </span>{' '}
                                <CountdownTimer time={each.end_time} />
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {/* {each.description} */}
                              </Typography>
                            </Grid>
                            {/* <Grid
                              item
                              style={
                                {
                                  // marginLeft: '-10px',
                                  // display: 'flex',
                                }
                              }
                            >
                              <Link
                                to={{
                                  pathname: '/vote',
                                  state: {
                                    electionAddress: each.public_key,
                                  },
                                }}
                                style={{
                                  textDecoration: 'none',
                                  marginRight: '1em',
                                }}
                              >
                                <Button variant="contained">Vote</Button>
                              </Link>
                              <Link
                                to={{
                                  pathname: '/election-result',
                                  state: {
                                    electionAddress: each.public_key,
                                  },
                                }}
                                style={{
                                  textDecoration: 'none',
                                }}
                              >
                                <Button
                                  variant="contained"
                                  endIcon={<FaChartBar />}
                                >
                                  Result
                                </Button>
                              </Link>
                            </Grid> */}
                            <Grid item></Grid>
                          </Grid>
                          {/* <Grid item> */}
                          <svg height="100" width="100" className="blinking">
                            <circle cx="50" cy="10" r="10" fill="#ead72e" />
                          </svg>
                          {/* </Grid> */}
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </>
          )}

          {elections['ended'].length !== 0 && (
            <>
              <div className="election-body">
                <h1>Ended elections</h1>
              </div>

              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {elections['ended'].map((each) => (
                  <Grid item xs={2} sm={4} md={4} key={each}>
                    <Item>
                      <Grid container spacing={3}>
                        <Grid item xs={9} sm container>
                          <Grid
                            item
                            xs
                            container
                            direction="column"
                            spacing={2}
                          >
                            <Grid item xs>
                              <Typography
                                gutterBottom
                                variant="subtitle1"
                                component="h2"
                              >
                                {each.title}
                                {/* {each.first_name} {each.last_name} */}
                              </Typography>
                              <Typography variant="body2" gutterBottom>
                                <span
                                  style={{
                                    fontWeight: 'bold',
                                    marginLeft: '-10px',
                                  }}
                                >
                                  Ended At: {returnTime(each.end_time)}
                                </span>{' '}
                                {/* <CountdownTimer time={each.end_time} /> */}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {/* {each.description} */}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              style={
                                {
                                  // marginLeft: '-10px',
                                  // display: 'flex',
                                }
                              }
                            >
                              {/* <Link
                               to={{
                                 pathname: '/vote',
                                 state: {
                                   electionAddress: each.public_key,
                                 },
                               }}
                               style={{
                                 textDecoration: 'none',
                                 marginRight: '1em',
                               }}
                             >
                               <Button variant="contained">Vote</Button>
                             </Link> */}
                              <Link
                                to={{
                                  pathname: '/election-result',
                                  state: {
                                    electionAddress: each.public_key,
                                  },
                                }}
                                style={{
                                  textDecoration: 'none',
                                }}
                              >
                                <Button
                                  variant="contained"
                                  endIcon={<FaChartBar />}
                                >
                                  Result
                                </Button>
                              </Link>
                            </Grid>
                            <Grid item></Grid>
                          </Grid>
                          {/* <Grid item> */}
                          <svg height="100" width="100" className="blinking">
                            <circle cx="50" cy="10" r="10" fill="#f40e0e" />
                          </svg>
                          {/* </Grid> */}
                        </Grid>
                      </Grid>
                    </Item>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ElectionList
