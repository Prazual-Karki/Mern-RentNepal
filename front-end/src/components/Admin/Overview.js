import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import PersonIcon from '@mui/icons-material/Person'
import { Grid, Typography } from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Variants() {
  const [totalUsers, settotalUsers] = useState(0)
  const [totalProducts, settotalProducts] = useState(0)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .get(
        'http://localhost:8080/getTotalUsersAndProducts',
        {
          headers: {
            authorization: `bearer ${localStorage.getItem('token')}`,
          },
        },
        {
          cancelToken: cancelToken.token,
        }
      )
      .then((res) => {
        settotalUsers(res.data.totalUsers)
        settotalProducts(res.data.totalProducts)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup ')
        }
      })

    return () => {
      cancelToken.cancel()
    }
  }, [])

  const paperStyle = {
    pl: '10%',
    py: '10%',
    backgroundColor: '#E8E8E8',
  }
  return (
    <Box px='5%' py='1%'>
      <Grid container spacing={3}>
        <Grid item xs={6} md={6}>
          <Paper sx={paperStyle}>
            <PersonIcon sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div'>
              users
            </Typography>
            <Typography fontSize={70} variant='caption' component='div'>
              {totalUsers}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={6}>
          <Paper sx={paperStyle}>
            <LibraryBooksIcon sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div'>
              uploaded shoes
            </Typography>
            <Typography fontSize={70} variant='caption' component='div'>
              {totalProducts}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
