import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import CopyrightIcon from '@mui/icons-material/Copyright'
import { Link } from 'react-router-dom'

export default function FullWidthGrid() {
  const myIcon = {
    cursor: 'pointer',
    fontSize: '40',
    margin: '5%',
  }
  const d = new Date()
  return (
    <Box
      mt={2}
      sx={{
        flexGrow: 1,
        backgroundColor: '#4f4a4a',
        color: 'white',
        textAlign: 'center',
        padding: '3% 5% 1% 5%',
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={12} md={4} lg={4}>
          <Typography variant='h5'>RentNepal</Typography>
          <hr />

          <Typography variant='body2'>
            Rent-Nepal is a free online platform where you can rent and lend the
            products in an easy way. Whether you're looking clothes, shoes or
            bags for special occasion or something for a night out, give
            yourself a VIP treatment. Whatever your style, rent or lend product
            here.
          </Typography>
        </Grid>

        <Grid item xs={12} md={4} lg={4}>
          <Typography variant='h6'>CONTACT US</Typography>
          <hr />

          <Typography variant='body1'>
            9800000000
            <br />
            info@rentnepal.com
            <br />
            Kathmandu, Nepal
          </Typography>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Typography variant='h6'>FOLLOW US ON</Typography>
          <hr />

          <Grid container justifyContent='center'>
            <FacebookIcon style={myIcon} />
            <InstagramIcon style={myIcon} />
            <TwitterIcon style={myIcon} />
          </Grid>
        </Grid>
      </Grid>
      <hr />
      <Box display='flex' justifyContent='center' alignItems='center'>
        Copyright &nbsp;
        <CopyrightIcon fontSize='small' />
        &nbsp; RentNepal {d.getFullYear()} . All rights reserved.&nbsp;
        <Link to='/legalTerms' style={{ color: 'white' }}>
          Terms of sevice and privacy policy
        </Link>
      </Box>
    </Box>
  )
}
