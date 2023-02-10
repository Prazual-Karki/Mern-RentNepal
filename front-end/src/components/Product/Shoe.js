import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import noPhoto from '../Product/photos/noPhoto.jpg'

export default function MultiActionAreaCard(props) {
  var photoName = props.data.photo.replace('public\\', '')
  photoName = `http://localhost:8080/${photoName}`

  return (
    <Grid item xs={6} sm={6} md={3}>
      <Card>
        <CardActionArea>
          <img
            src={photoName ? photoName : noPhoto}
            height='250'
            width='100%'
            alt='shoes'
          />

          <CardContent component='div' sx={{ pb: '2%', pl: '10%' }}>
            <Typography
              variant='caption'
              color='gray'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LocationOnIcon fontSize='small' />
              &nbsp;{props.data.location}
            </Typography>
            <Typography variant='h6' fontSize='xxLarge' component='div' mt={1}>
              {props.data.name.toUpperCase()}
            </Typography>
            <Typography variant='body2' component='div'>
              {props.data.type}
            </Typography>
            {/* <Typography variant='body2'>Rent price: N/A</Typography>
            <Typography variant='body2'>Size: N/A</Typography> */}
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link
            to='/user/shoeInfo'
            style={{ textDecoration: 'none', marginLeft: '5%' }}
          >
            <Button size='small' color='primary'>
              See more
            </Button>
          </Link>
        </CardActions>
      </Card>
    </Grid>
  )
}
