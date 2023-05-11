import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import noPhoto from '../Product/photos/noPhoto.jpg'
import FavoriteIcon from '@mui/icons-material/Favorite'

export default function MultiActionAreaCard(props) {
  var photoName = props.data.photo.replace('public\\', '')
  photoName = `http://localhost:8080/${photoName}`

  return (
    <Grid item xs={6} sm={6} md={4}>
      <Card>
        <CardActionArea>
          <img
            src={photoName ? photoName : noPhoto}
            height='250'
            width='100%'
            alt='shoes'
          />

          <CardContent component='div' sx={{ pb: '2%', pl: '5%' }}>
            <Typography
              variant='caption'
              color='gray'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <LocationOnIcon fontSize='small' />
              &nbsp;{props.data.location}
            </Typography>
            <Typography
              variant='body1'
              component='div'
              sx={{ fontSize: 17 }}
              gutterBottom
            >
              {props.data.name.toUpperCase()}
            </Typography>

            <Typography
              variant='caption'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <FavoriteIcon fontSize='small' color='error' />
              &nbsp;{props.data.likes.length} people liked this
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Link
            to={`/user/shoeInfo/${props.data._id}`}
            style={{ textDecoration: 'none', marginLeft: '3%' }}
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
