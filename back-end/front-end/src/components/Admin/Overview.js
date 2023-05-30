import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import PersonIcon from '@mui/icons-material/Person'
import { Grid, Typography } from '@mui/material'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReceiptIcon from '@mui/icons-material/Receipt'
import { BASE_URL } from '../helper'

export default function Variants() {
  const [totalUsers, settotalUsers] = useState(0)
  const [totalProducts, settotalProducts] = useState(0)
  const [totalTransactions, settotalTransactions] = useState(0)

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .get(
        `${BASE_URL}/getTotalUsersAndProducts`,
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
        settotalTransactions(res.data.totalTransactions)
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
        <Grid item xs={6} md={4}>
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
        <Grid item xs={6} md={4}>
          <Paper sx={paperStyle}>
            <LibraryBooksIcon sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div'>
              uploaded product
            </Typography>
            <Typography fontSize={70} variant='caption' component='div'>
              {totalProducts}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={6} md={4}>
          <Paper sx={paperStyle}>
            <ReceiptIcon sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div'>
              Rental Transactions
            </Typography>
            <Typography fontSize={70} variant='caption' component='div'>
              {totalTransactions}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
