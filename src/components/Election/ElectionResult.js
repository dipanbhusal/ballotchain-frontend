import React, { useState, useEffect } from 'react'

import './election.css'
import axios from '../Axios/axios'
import urls from '../Axios/urls'
import Loading from '../common/Loading'
import PieChart from './PieChart'
import VotesTable from './VotesTable'
import ResultTable from './ResultTable'

const ElectionResult = (props) => {
  const [candidates, setCandidates] = useState(null)
  const [votes, setVotes] = useState(null)
  const [electionState, setElectionState] = useState(null)
  const [voters, setVoters] = useState(0)
  const [voteCount, setVoteCount] = useState(0)
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
        // console.log(response)
        setCandidates(response.data.details.candidates_data)
        setVotes(response.data.details.votes)
        console.log(response)
        setVoteCount(response.data.details.total_votes_count)
        setVoters(response.data.details.total_voters_count)
        setElectionState(response.data.details.election_state)
      })
      .catch((error) => {
        console.log(error.response)
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
            Election Status:{' '}
            {electionState === 1 ? (
              <>
                <span>Election on Progress</span>
                <svg height="35" width="100" className="blinking">
                  <circle cx="20" cy="25" r="10" fill="#62bd19" />
                </svg>
              </>
            ) : (
              <>
                <span>Election Ended </span>
                <svg height="35" width="100" className="blinking">
                  <circle cx="20" cy="25" r="10" fill="#f40e0e" />
                </svg>
              </>
            )}{' '}
          </h3>
          {votes && (
            <>
              <h5>Total Voters: {voters} </h5>
              <h5>Total Casted Votes: {voteCount} </h5>
              <h3>Result </h3>
              <ResultTable votes={votes} />
              <h3>Live Votes</h3>
              <VotesTable votes={votes} />
            </>
          )}
          {candidates && (
            <>
              <h3> Pie Chart </h3>
              <PieChart candidates={candidates} />
            </>
          )}
        </>
      ) : (
        <Loading />
      )}
    </>
  )
}

export default ElectionResult
