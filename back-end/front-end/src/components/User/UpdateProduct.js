import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import noPhoto from '../Product/photos/noPhoto.jpg'
import { BASE_URL } from '../helper'

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
import { useParams, useNavigate } from 'react-router-dom'
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
        `${BASE_URL}/getProductDetailById/${params.id}`,
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
        setproductInfo(res.data.productDetails)

        if (res.data.productDetails.photo) {
          var photoName = res.data.productDetails.photo.replace('public/', '')
          photoName = `${BASE_URL}/${photoName}`
          setprofilePic(photoName)
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log('fetch cancelled for cleanup of updateProduct.js')
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
        formData.append('location', productInfo.location)

        formData.append('photo', imageFile)

        const response = await axios.put(
          `${BASE_URL}/updateProductById/` + params.id,
          formData,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.status === 200) {
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
        width: '95%',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
        margin: 'auto',
        marginTop: '1%',
        textAlign: 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h5' align='center'>
        Update Product information
      </Typography>
      <hr />
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <img
            src={profilePic ? profilePic : noPhoto}
            alt='pic'
            height='300px'
            width='400px'
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!formErrors.name}
                value={productInfo.name}
                helperText={formErrors.name ? formErrors.name : ''}
                label='name of product'
                name='name'
                variant='standard'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl variant='standard' sx={{ m: 1, width: '30ch' }}>
                <InputLabel id='demo-simple-select-standard-label'>
                  choose product type
                </InputLabel>
                <Select
                  labelId='demo-simple-select-standard-label'
                  id='demo-simple-select-standard'
                  name='type'
                  value={productInfo.type}
                  onChange={handleChange}
                  label='Type'
                >
                  <MenuItem value='trekking'>Trekking items</MenuItem>
                  <MenuItem value='watch'>Watches</MenuItem>
                  <MenuItem value='coats'>Coats/blazers</MenuItem>
                  <MenuItem value='carryBags'>Carry bags</MenuItem>
                  <MenuItem value='ladiesItem'>saree/heels/bags</MenuItem>
                  <MenuItem value='music'>musical items</MenuItem>
                  <MenuItem value='biCycle'>Bi-Cycle</MenuItem>
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
                value={productInfo.size}
                helperText={formErrors.size ? formErrors.size : ''}
                id='registerPhone'
                label='product size'
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
          </Grid>

          <br />
          <div>
            <Button component='label' startIcon={<AddAPhotoIcon />}>
              <input
                hidden
                accept='image/*'
                type='file'
                onChange={(e) => {
                  setuploadedFile(e.target.files[0])
                  setprofilePic(URL.createObjectURL(e.target.files[0]))
                }}
              />
              change product photo
            </Button>
          </div>

          <Button
            variant='contained'
            color='error'
            sx={{ display: 'block', margin: 'auto', mt: 2 }}
            onClick={handleSubmit}
          >
            Update product info
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
