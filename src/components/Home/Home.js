import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Instructions } from './Instructions'

import './home.css'

function Home() {
  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', px: 3 }}>
      <h3 className="home-body">Instructions for voters:</h3>
      {Instructions.map((item, index) => {
        return (
          <Paper sx={{ maxWidth: 400, my: 1, mx: 'auto', p: 2 }} key={index}>
            <Grid container wrap="nowrap" spacing={2}>
              <Grid item>
                <Avatar>{item.index}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography>{item.instruction}</Typography>
              </Grid>
            </Grid>
          </Paper>
        )
      })}
    </Box>
  )
}

export default Home
