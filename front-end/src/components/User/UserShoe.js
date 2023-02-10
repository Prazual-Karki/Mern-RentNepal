import * as React from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Button, CardActionArea, CardActions } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { Grid } from '@mui/material'
import { Link } from 'react-router-dom'
import noPhoto from '../Product/photos/noPhoto.jpg'
import axios from 'axios'
export default function MultiActionAreaCard(props) {
  var photoName = props.data.photo.replace('public\\', '')
  photoName = `http://localhost:8080/${photoName}`

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:8080/deleteSingleProduct/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem('token')}`,
      },
    })
  }
  return (
    <Grid item xs={6} sm={6} md={4}>
      <Card>
        <CardActionArea>
          <img
            src={photoName ? photoName : noPhoto}
            height='300'
            width='100%'
            alt='shoes'
          />

          <CardContent component='div' sx={{ pb: '2%', ml: '5%' }}>
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
            <Typography variant='button' component='div'>
              Type : {props.data.type}
            </Typography>
            <Typography variant='body2'>
              Rent price: Rs.{props.data.price}/day
            </Typography>
            <Typography variant='body2'>Size: {props.data.size}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link
            to={`/user/updateProduct/${props.data._id}`}
            style={{ textDecoration: 'none', marginLeft: '5%' }}
          >
            <Button size='small' color='warning' variant='contained'>
              Update
            </Button>
          </Link>
          <Button
            size='small'
            color='error'
            variant='contained'
            sx={{ ml: '10%' }}
            onClick={() => {
              handleDelete(props.data._id)
            }}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}
