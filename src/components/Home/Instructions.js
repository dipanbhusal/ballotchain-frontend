import { Link } from 'react-router-dom'

const style = {
  textDecoration: 'None',
}

export const Instructions = [
  {
    index: 1,
    instruction: (
      <>
        Check if your profile is verified by admin. You can check on{' '}
        <Link to="/profile" style={style}>
          {' '}
          profile{' '}
        </Link>{' '}
        section
      </>
    ),
  },
  {
    index: 2,
    instruction: <>Go to election section and select enrolled election.</>,
  },
  {
    index: 3,
    instruction: <>You can check live election result from election section.</>,
  },
]
