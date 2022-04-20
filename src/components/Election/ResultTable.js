import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))
const ResultTable = ({ votes }) => {
  const [result, setResult] = useState({})

  useEffect(() => {
    let data = {}
    votes.map((each) => {
      let pk = each.to.public_key
      let name = each.to.first_name + ' ' + each.to.last_name
      if (data.hasOwnProperty(pk)) {
        data[`${pk}`].count += 1
      } else {
        data[`${pk}`] = { count: 1, name: name }
      }
    })

    if (data) {
      let sorted = {}

      Object.keys(data)
        .sort(function (a, b) {
          return data[b].count - data[a].count
        })
        .forEach(function (key) {
          sorted[key] = data[key]
        })
      setResult(sorted)
    }
  }, [])

  return (
    <>
      {Object.keys(result).length !== 0 && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Candidate Name</StyledTableCell>
                <StyledTableCell align="right">Total Votes</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(result).map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {result[`${row}`].name}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {result[`${row}`].count}{' '}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default ResultTable
