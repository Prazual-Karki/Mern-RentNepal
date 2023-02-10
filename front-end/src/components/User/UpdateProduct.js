import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function ValidationTextFields() {
  const params = useParams()
  const navigate = useNavigate()
  const userId = JSON.parse(localStorage.getItem('users'))._id
  const [productInfo, setproductInfo] = useState({
    name: '',
    type: '',
    size: '',
    price: '',
    location: '',
    status: '',
    photo: '',
  })
  const [uploadedFile, setuploadedFile] = useState(null)
  const [profilePic, setprofilePic] = useState(null)
  const [isupdate, setisupdate] = useState(false)

  const [formErrors, setformErrors] = useState({})

  useEffect(() => {
    const cancelToken = axios.CancelToken.source()

    axios
      .get(
        `http://localhost:8080/getProductDetailById/${params.id}`,
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
        setproductInfo(res.data)
        if (res.data.photo) {
          var photoName = res.data.photo.replace('public\\', '')
          photoName = `http://localhost:8080/${photoName}`
          setprofilePic(photoName)
          // setprofilePic(userDetails.photo)
        }
        // console.log('profilePic: ', profilePic)
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of profile.js')
        }
      })

    return () => {
      cancelToken.cancel()
    }
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target

    setproductInfo({
      ...productInfo,
      [name]: value,
    })

    // var src = URL.createObjectURL(event.target.files[0]);
    // imgRef.current.src = src;
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setformErrors(validateForm(productInfo))
    setisupdate(true)
    if (Object.keys(formErrors).length === 0 && isupdate) {
      try {
        const imageFile = uploadedFile ? uploadedFile : productInfo.photo
        const formData = new FormData()
        formData.append('name', productInfo.name)
        formData.append('price', productInfo.price)
        formData.append('size', productInfo.size)
        formData.append('type', productInfo.type)
        formData.append('status', productInfo.status)
        formData.append('location', productInfo.location)

        formData.append('photo', imageFile)

        const response = await axios.put(
          'http://localhost:8080/updateProductById/' + params.id,
          formData,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.status === 200) {
          console.log(response.data)
          navigate('/user/dashboard/' + userId)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const validateForm = (values) => {
    const errors = {}

    if (!values.photo) {
      errors.photo = '*required'
    }
    if (!values.type) {
      errors.type = '*required'
    }

    if (values.name.length < 1) {
      errors.productName = '*required'
    }
    if (values.size.length < 1) {
      errors.size = '*required'
    }
    if (values.price.length < 1) {
      errors.price = '*required'
    }
    if (values.location.length < 1) {
      errors.location = '*required'
    }

    return errors
  }
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' },

        backgroundColor: '#f0ebec',
        padding: '2% 1%',
        maxWidth: '600px',
        width: '100%',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
        margin: 'auto',
        marginTop: '1%',
        textAlign: 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h5' align='center'>
        Update shoes information
      </Typography>
      <hr />
      <img src={profilePic} alt='pic' height='150px' width='150px' />

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <TextField
            error={!!formErrors.name}
            value={productInfo.name}
            helperText={formErrors.name ? formErrors.name : ''}
            label='name of shoe'
            name='name'
            variant='standard'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant='standard' sx={{ m: 1, width: '30ch' }}>
            <InputLabel id='demo-simple-select-standard-label'>
              choose shoe type
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              name='type'
              value={productInfo.type}
              onChange={handleChange}
              label='Type'
            >
              <MenuItem value='sports'>Sports</MenuItem>
              <MenuItem value='trekking'>Trekking</MenuItem>
              <MenuItem value='sneakers'>Sneakers</MenuItem>
              <MenuItem value='formal'>Formal</MenuItem>
              <MenuItem value='heel'>Heel</MenuItem>
              <MenuItem value='other'>Other</MenuItem>
            </Select>
            <FormHelperText>
              <Typography color='error' variant='caption' component='span'>
                {formErrors.type}
              </Typography>
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            error={!!formErrors.size}
            value={productInfo.size.toString()}
            helperText={formErrors.size ? formErrors.size : ''}
            type='number'
            id='registerPhone'
            label='shoe size'
            name='size'
            variant='standard'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            error={!!formErrors.price}
            value={productInfo.price.toString()}
            label='price/day'
            name='price'
            type='number'
            id='registerPhone'
            helperText={formErrors.price ? formErrors.price : ''}
            variant='standard'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            error={!!formErrors.location}
            value={productInfo.location}
            helperText={formErrors.location ? formErrors.location : ''}
            label='pickup location for product'
            name='location'
            variant='standard'
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl variant='standard' sx={{ m: 1, width: '30ch' }}>
            <InputLabel id='demo-simple-select-standard-label'>
              Available/Taken
            </InputLabel>
            <Select
              labelId='demo-simple-select-standard-label'
              id='demo-simple-select-standard'
              name='status'
              value={productInfo.status}
              onChange={handleChange}
              label='Type'
            >
              <MenuItem value='available'>Available</MenuItem>
              <MenuItem value='taken'>Taken</MenuItem>
            </Select>
            <FormHelperText>
              <Typography color='error' variant='caption' component='span'>
                {formErrors.status}
              </Typography>
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <br />
      <div>
        <Button component='label' startIcon={<AddAPhotoIcon />}>
          <input
            hidden
            accept='image/*'
            type='file'
            onChange={(e) => setuploadedFile(e.target.files[0])}
          />
          change product photo
        </Button>

        {uploadedFile ? uploadedFile.name : ''}
      </div>

      <Button
        variant='contained'
        color='error'
        sx={{ display: 'block', margin: 'auto', mt: 2 }}
        onClick={handleSubmit}
      >
        Update shoes info
      </Button>
    </Box>
  )
}
