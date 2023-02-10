import * as React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { Avatar, Button, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import PhoneIcon from '@mui/icons-material/Phone'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
export default function FullWidthGrid() {
  return (
    <Box sx={{ flexGrow: 1, p: 2, mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={7} pl={5} pr={3} mb={3}>
          <img
            height='450'
            width='100%'
            src='https://images.squarespace-cdn.com/content/v1/61dcd32b3fb8bb4b5af9b560/1668707748473-KDWCBG5HOQ1XVF5E179L/Allbirds%2BShoes.png'
            alt='shoe info'
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper
            elevation={3}
            sx={{ pt: 3, pl: 5, pb: 3, pr: 5, ml: 1, mr: 2 }}
          >
            <Typography variant='h5' component='h6'>
              Nike air Jordan
            </Typography>
            <Typography
              mb={2}
              variant='caption'
              color='gray'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LocationOnIcon fontSize='small' />
              &nbsp;kotesor, kathmandu
            </Typography>

            <Typography variant='button' component='div'>
              SIZE : 49
            </Typography>
            <Typography variant='button' component='div'>
              Type : Formal
            </Typography>
            <Typography variant='button' component='div'>
              Price: Rs. 100/day
            </Typography>

            <Button
              size='small'
              variant='contained'
              color='error'
              sx={{ cursor: 'text', mt: 2, mb: 1 }}
            >
              taken
            </Button>
            <hr />

            {/* owner info */}
            <Typography mt={2} mb={2} variant='h6' component='h6'>
              Owner information:
            </Typography>
            <Avatar
              alt='Remy Sharp'
              sx={{ width: 56, height: 56, mb: 2 }}
              src='https://m.media-amazon.com/images/M/MV5BMjMwNTIxODg0OF5BMl5BanBnXkFtZTgwODg2NzM0OTE@._V1_.jpg'
            />
            <Typography
              variant='subtitle1'
              component='div'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <AccountCircleIcon />
              &nbsp;prazual karki
            </Typography>
            <Typography
              variant='subtitle1'
              component='div'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <PhoneIcon fontSize='small' />
              &nbsp;&nbsp;9800922267
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
