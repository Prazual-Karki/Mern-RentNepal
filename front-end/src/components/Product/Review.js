import { Grid, Typography, TextField, Box } from '@mui/material'
import React from 'react'

const Review = () => {
  return (
    <Box>
      <Grid container spacing={3} my='2%'>
        <Grid item xs={12} md={6}>
          <Typography textAlign='center' variant='h6'>
            Review of this Product
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box px='5%'>
            <Typography textAlign='center' variant='h6'>
              Give your review about this product
            </Typography>
            <TextField
              id='outlined-multiline-static'
              label='reviews here....'
              multiline
              rows={4}
              fullWidth
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Review
