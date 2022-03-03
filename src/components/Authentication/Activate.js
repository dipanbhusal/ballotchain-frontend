import { Button } from '@material-ui/core'
import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Activate = () => {
  const history = useHistory()
  const handleClick = () => {
    history.push('/profile')
  }
  return (
    <>
      <h3>
        Your profile is not verified. Please upload necessary documents to
        verify your profile to be eligible for voting.
      </h3>
      <Button className="body-auth" variant="contained" onClick={handleClick}>
        Verify Profile
      </Button>
    </>
  )
}

export default Activate
