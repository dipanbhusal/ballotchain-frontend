import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import ButtonBase from '@mui/material/ButtonBase'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import { FaChartBar, FaVoteYea } from 'react-icons/fa'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import './vote.css'
import Loading from '../common/Loading'

import { CircularProgress } from '@material-ui/core'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Alert from '@mui/material/Alert'

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

const Vote = (props) => {
  const [open, setOpen] = useState(false)
  const [votingOpen, setVotingOpen] = useState(false)
  const [candidates, setCandidates] = useState('')
  const [candidateAddress, setCandidateAddress] = useState('')
  const [electionAddress, setElectionAddress] = useState(
    props.location.state.electionAddress,
  )
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  let user = JSON.parse(localStorage.getItem('currentUser'))

  useEffect(async () => {
    await getCandidates()
  }, [])

  async function getCandidates() {
    await axios({
      url: urls.CANDIDATE_LIST + `?election_address=${electionAddress}`,
      method: 'GET',
      data: {
        election_address: electionAddress,
      },
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

  async function doVote() {
    console.log(password)
    await axios({
      url: urls.VOTE,
      method: 'POST',
      data: {
        candidate_id: candidateAddress,
        election_address: electionAddress,
        pw: password,
      },
    })
      .then((response) => {
        setMessage(
          'Successfully voted to candidate. Go to results section to get live result.',
        )
        user['has_voted'] = true
        user = localStorage.setItem('currentUser', JSON.stringify(user))
        setOpen(false)
        setVotingOpen(false)
      })
      .catch((error) => {
        console.log(error.response.data)
        setErrorMsg(error.response.data.message)
        setOpen(false)
        setVotingOpen(false)
      })
  }

  const handleClickOpen = ({ candidateAddress }) => {
    setCandidateAddress(candidateAddress)
    setOpen(true)
    console.log(candidateAddress, electionAddress)
  }

  const handleVote = () => {
    // setOpen(true)
    setVotingOpen(true)
    doVote()
  }

  const handleClose = () => {
    setOpen(false)
  }
  console.log(user)

  const VotingProgress = () => {
    return (
      <>
        <div style={{ position: 'relative', paddingLeft: '25%' }}>
          {/* <span
                  style={{
                    position: 'absolute',
                    top: '45%',
                    left: '40%',
                    fontWeight: 'bold',
                    fontSize: '30px',
                  }}
                ></span> */}
          <CircularProgress size={150} />
        </div>
        <h5
          style={{
            // paddingLeft: '27%',
            fontWeight: 'bold',
            fontSize: '30px',
          }}
        >
          Voting On Progress
        </h5>
      </>
    )
  }

  const DialougeBox = (data) => {
    return (
      <Dialog open={open} onClose={handleClose} style={{ width: '100%' }}>
        <DialogTitle>BallotChain</DialogTitle>
        {votingOpen ? (
          <DialogContent>
            <DialogContentText>
              <VotingProgress />
            </DialogContentText>
          </DialogContent>
        ) : user.has_voted ? (
          <>
            <DialogContent>
              <DialogContentText>
                You have already voted. Click Result to see election result.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleVote}>
                <Link
                  to={{
                    pathname: '/result',
                    state: {
                      electionAddress: electionAddress,
                    },
                  }}
                >
                  Result
                </Link>
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                To cast vote please enter your password.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Password"
                type="password"
                fullWidth
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleVote}>Vote</Button>
              <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    )
  }
  return (
    <>
      <div className="party-body">
        <h1>Voting Page</h1>
      </div>
      {message && <Alert severity="success">{message}</Alert>}
      {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
      {candidates ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <DialougeBox />
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
                        <Button
                          variant="contained"
                          endIcon={<FaVoteYea />}
                          onClick={() =>
                            handleClickOpen({
                              candidateAddress: each.public_key,
                            })
                          }
                          style={{ marginRight: '10px' }}
                        >
                          Vote
                        </Button>
                        <Link
                          to={{
                            pathname: '/election-result',
                            state: {
                              electionAddress: electionAddress,
                            },
                          }}
                        >
                          <Button variant="contained" endIcon={<FaChartBar />}>
                            Result
                          </Button>
                        </Link>
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
