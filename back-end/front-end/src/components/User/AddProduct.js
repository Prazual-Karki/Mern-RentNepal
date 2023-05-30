import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Alert } from '@mui/material'
import axios from 'axios'
import noPhoto from '../Product/photos/noPhoto.jpg'
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
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../helper'

export default function ValidationTextFields() {
  const navigate = useNavigate()
  const [sameProduct, setsameProduct] = useState('')
  const [productInfo, setproductInfo] = useState({
    productName: '',
    type: '',
    size: '',
    price: '',
    location: '',
    status: 'available',
    description: '',
    photo: null,
  })

  const [isSubmit, setisSubmit] = useState(false)
  const [formErrors, setformErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target

    setproductInfo({
      ...productInfo,
      [name]: value,
    })
    if (name.length > 1) {
      setformErrors({ name: null })
    }

    // var src = URL.createObjectURL(event.target.files[0]);
    // imgRef.current.src = src;
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setformErrors(validateForm(productInfo))
    setisSubmit(true)
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      try {
        const userId = JSON.parse(localStorage.getItem('users'))._id
        if (userId) {
          const formData = new FormData()
          formData.append('name', productInfo.productName)
          formData.append('price', productInfo.price)
          formData.append('size', productInfo.size)
          formData.append('type', productInfo.type)
          formData.append('userId', userId)
          formData.append('location', productInfo.location)
          formData.append('photo', productInfo.photo)
          formData.append('status', productInfo.status)
          formData.append('description', productInfo.description)

          const response = await axios.post(
            `${BASE_URL}/addProduct`,
            formData,
            {
              headers: {
                authorization: `bearer ${localStorage.getItem('token')}`,
              },
            }
          )

          if (response.status === 201) {
            console.log('uploaded succesfully')
            navigate('/user/dashboard/' + userId)
          }
          if (response.status === 200) {
            setsameProduct(response.data)
          }
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

    if (values.productName.length < 1) {
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
        padding: '2% 2%',
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
        Upload Product
      </Typography>
      <hr />
      <Grid container spacing={2}>
        <Grid item xs={12} md={5}>
          <img
            src={
              productInfo.photo
                ? URL.createObjectURL(productInfo.photo)
                : noPhoto
            }
            alt='productPhoto'
            height='300px'
            width='400px'
            style={{ marginTop: '20px' }}
          />
          <div>
            <Button component='label' startIcon={<AddAPhotoIcon />}>
              <input
                hidden
                accept='image/png, image/jpeg, image/jpg'
                type='file'
                name='photo'
                onChange={(e) =>
                  setproductInfo({ ...productInfo, photo: e.target.files[0] })
                }
              />
              upload photo
            </Button>
            &nbsp;
            {!!productInfo.photo ? (
              ''
            ) : (
              <p style={{ color: 'red' }}>{formErrors.photo}</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={7}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!formErrors.productName}
                value={productInfo.productName}
                helperText={
                  formErrors.productName ? formErrors.productName : ''
                }
                label='name of product'
                name='productName'
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
                label='product size or length'
                name='size'
                variant='standard'
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!formErrors.price}
                value={productInfo.price}
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
              <TextField
                id='outlined-multiline-static'
                label='add a description for the product '
                variant='standard'
                value={productInfo.description}
                name='description'
                multiline
                maxRows={5}
                inputProps={{ maxLength: 300 }}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          <br />

          {sameProduct ? (
            <Alert
              severity='warning'
              variant='outlined'
              sx={{
                width: '70%',
                justifyContent: 'center',
                margin: 'auto',
              }}
            >
              {sameProduct}!
            </Alert>
          ) : (
            ''
          )}

          <Button
            variant='contained'
            color='error'
            sx={{ display: 'block', margin: 'auto', mt: 2 }}
            onClick={handleSubmit}
          >
            Upload product
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
