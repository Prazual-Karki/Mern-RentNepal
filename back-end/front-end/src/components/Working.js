import * as React from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Button, Typography } from '@mui/material'
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop'
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import SnowshoeingIcon from '@mui/icons-material/Snowshoeing'
import ListAltIcon from '@mui/icons-material/ListAlt'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import VibrationIcon from '@mui/icons-material/Vibration'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Link } from 'react-router-dom'

export default function BasicGrid() {
  const auth = localStorage.getItem('users')
  const adminAuth = localStorage.getItem('admin')
  const gridStyle = {
    textAlign: 'center',
    padding: '4% 0% 5% 0%',
  }
  return (
    <Box bgcolor='#E8E8E8'>
      <Box textAlign='center' px='20%' pt='2%'>
        <Typography variant='h5' gutterBottom>
          HOW RENTNEPAL WORKS ?
        </Typography>
        <hr />
        <Typography variant='body1'>
          An online platform that allows users to register and login to upload
          information about their product and rent them to others, as well as
          rent products from others that have been uploaded to the website.
        </Typography>

        <Typography
          color='error'
          variant='button'
          textAlign='center'
          fontSize={22}
          component='div'
          pt='5%'
        >
          rent more, earn more
        </Typography>
      </Box>
      <hr />
      <Box sx={{ flexGrow: 1, px: 15 }}>
        <Typography variant='h5' textAlign='center' pt={4}>
          HOW TO RENT?
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6} md={3} style={gridStyle}>
            <ScreenSearchDesktopIcon color='warning' sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div' mt={3}>
              1.HAVE A LITTLE BROWSE
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} style={gridStyle}>
            <AppRegistrationIcon color='warning' sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div' mt={3}>
              2.SIGN UP AND GET VERIFIED
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} style={gridStyle}>
            <ConnectWithoutContactIcon color='warning' sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div' mt={3}>
              3.BOOK THE ITEM
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} style={gridStyle}>
            <SnowshoeingIcon color='warning' sx={{ fontSize: 70 }} />

            <Typography variant='button' component='div' mt={3}>
              4.ENJOY AND RETURN
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <hr />
      <Box sx={{ flexGrow: 1, px: 15 }}>
        <Typography variant='h5' textAlign='center' mb={2} pt={4}>
          HOW TO LEND?
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={6} md={3} style={gridStyle}>
            <AppRegistrationIcon color='success' sx={{ fontSize: 70 }} />

            <Typography variant='button' component='div' mt={3}>
              1.SIGN UP AND GET VERIFIED
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} style={gridStyle}>
            <ListAltIcon color='success' sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div' mt={3}>
              2.LIST ITEMS AND SET PRICE
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} style={gridStyle}>
            <VibrationIcon color='success' sx={{ fontSize: 70 }} />
            <Typography variant='button' component='div' mt={3}>
              3.NOTIFY FROM RENTER
            </Typography>
          </Grid>
          <Grid item xs={6} md={3} style={gridStyle}>
            <CurrencyExchangeIcon color='success' sx={{ fontSize: 70 }} />

            <Typography variant='button' component='div' mt={3}>
              4.EARN MONEY
            </Typography>
          </Grid>
        </Grid>
      </Box>

      {auth || adminAuth ? (
        <Box textAlign='center' bgcolor='#877e7e' color='white' py={5}>
          <Typography variant='h5' textAlign='center' mb={4} gutterBottom>
            Check out the amazing arrivals...
          </Typography>
          <Link to='/productList' style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='error'>
              move to product section now..
            </Button>
          </Link>
        </Box>
      ) : (
        <Box textAlign='center' bgcolor='#857d7d' color='white' py={5}>
          <Typography variant='h5'>Are you still confused?</Typography>
          <Box display='flex' justifyContent='center' mb={4}>
            <Accordion sx={{ width: '40%' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                <Typography variant='button' component='div'>
                  can i give you an idea?
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: '#756c6c' }}>
                <Typography variant='button' color='white' fontStyle={'italic'}>
                  Don't be so confused, Just sign in and relax
                </Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Typography variant='h5' textAlign='center' gutterBottom>
            Be a part of rental revoution now...
          </Typography>
          <Link to='/register' style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='error'>
              sign up now - it's free
            </Button>
          </Link>
        </Box>
      )}
    </Box>
  )
}
