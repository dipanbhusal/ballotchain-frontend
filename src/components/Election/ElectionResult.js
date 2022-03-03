import React, { useState, useEffect } from 'react'

import './election.css'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import Loading from '../common/Loading'
import PieChart from './PieChart'
import VotesTable from './VotesTable'

const ElectionResult = (props) => {
  const [candidates, setCandidates] = useState(null)
  const [votes, setVotes] = useState(null)
  const [electionState, setElectionState] = useState(null)
  const [electionAddress, setElectionAddress] = useState(
    props.location.state.electionAddress,
  )
  useEffect(async () => {
    await getResults()
  }, [])
  async function getResults() {
    await axios({
      url: urls.ELECTION_RESULT + `?election_address=${electionAddress}`,
      method: 'GET',
    })
      .then((response) => {
        console.log(response)
        setCandidates(response.data.details.candidates_data)
        setVotes(response.data.details.votes)
        setElectionState(response.data.details.election_state)
      })
      .catch((error) => {
        console.log(error.response.data)
      })
  }

  return (
    <>
      <div className="election-body">
        <h1>Election Result</h1>
      </div>
      {votes && candidates ? (
        <>
          <h3>
            Election Status: {electionState}{' '}
            <svg height="35" width="100" className="blinking">
              <circle cx="20" cy="25" r="10" fill="#62bd19" />
            </svg>{' '}
          </h3>
          <h3>Live Votes</h3>
          <VotesTable votes={votes} />
          <h3> Pie Chart </h3>
          <PieChart candidates={candidates} />
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ElectionResult
