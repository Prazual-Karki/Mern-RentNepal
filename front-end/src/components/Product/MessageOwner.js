import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import LoadingButton from '@mui/lab/LoadingButton'

import SendIcon from '@mui/icons-material/Send'

import { useState } from 'react'
import { Typography } from '@mui/material'

export default function FormDialog({ data, checkBooking }) {
  const [open, setOpen] = React.useState(false)
  const [rentDays, setrentDays] = useState(1)
  const [loading, setLoading] = React.useState(false)

  // for password

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleBooking = async () => {
    setLoading(true)
    const response = await axios.post(
      'http://localhost:8080/sendEmailAndStoreRentalDetails',
      {
        userId: data.userId,
        productId: data.productId,
        receiverEmail: data.receiverEmail,
        rentDays,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          authorization: `bearer ${localStorage.getItem('token')}`,
        },
      }
    )
    const statusResponse = await axios.put(
      `http://localhost:8080/changeProductStatus/${data.productId}`,
      { status: 'taken' },
      {
        headers: {
          'Content-Type': 'application/json',

          authorization: `bearer ${localStorage.getItem('token')}`,
        },
      }
    )

    if (statusResponse.status === 200 && response.status === 200) {
      setLoading(false)
      setOpen(false)

      checkBooking(true)

      console.log(
        'email sent success and stored in database and product booked'
      )
    }
  }

  return (
    <>
      <Button variant='outlined' onClick={handleClickOpen} component='span'>
        Book now
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send message to Owner</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Please fill out the days of rent and notify the owner
          </DialogContentText>

          <TextField
            variant='standard'
            value={rentDays}
            type='number'
            id='registerPhone'
            onChange={(e) => setrentDays(e.target.value)}
            sx={{ width: '35ch' }}
          />
          <Typography mt={3}>
            Note: properly check the product before renting them
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            size='small'
            onClick={handleBooking}
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition='end'
            variant='outlined'
          >
            <span>Book</span>
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}
