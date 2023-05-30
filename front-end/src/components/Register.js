import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Alert,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  FormControl,
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { useNavigate } from 'react-router-dom'
import noPhoto from './Product/photos/noPhoto.jpg'
import { BASE_URL } from './helper'

export default function ValidationTextFields() {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phone: '',
    gender: '',
    photo: null,
  })
  const [isSubmit, setisSubmit] = useState(false)
  const [isChecked, setisChecked] = useState(false)
  const [formErrors, setformErrors] = useState({})
  const [serverAuthError, setserverAuthError] = React.useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setuserDetails({
      ...userDetails,
      [name]: value,
    })
    if (name.length > 1) {
      setformErrors({ name: null })
    }
  }

  //   // var src = URL.createObjectURL(event.target.files[0]);
  //   // imgRef.current.src = src;
  // }
  const handleSubmit = async (event) => {
    event.preventDefault()
    setformErrors(validateForm(userDetails))
    setisSubmit(true)
    if (Object.keys(formErrors).length === 0 && isSubmit && isChecked) {
      try {
        const formData = new FormData()
        formData.append('firstname', userDetails.firstname)
        formData.append('lastname', userDetails.lastname)
        formData.append('email', userDetails.email)
        formData.append('password', userDetails.password)
        formData.append('address', userDetails.address)
        formData.append('phone', userDetails.phone)
        formData.append('photo', userDetails.photo)
        formData.append('gender', userDetails.gender)

        const response = await axios.post(`${BASE_URL}/signup`, formData)
        if (response.status === 200) {
          if (response.data.user && response.data.auth) {
            localStorage.setItem('users', JSON.stringify(response.data.user))
            localStorage.setItem('token', response.data.auth)
            navigate('/')
            console.log(' registered succesfully')
          } else {
            setserverAuthError(response.data)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  useEffect(() => {
    const auth = localStorage.getItem('users')
    const adminAuth = localStorage.getItem('admin')
    if (auth || adminAuth) {
      navigate('/')
    }
  }, [])

  const validateForm = (values) => {
    const errors = {}
    if (!isChecked) {
      errors.checkbox = 'please check the terms and conditions'
    }
    if (!values.photo) {
      errors.photo = '*required'
    }
    if (!values.gender) {
      errors.gender = '*required'
    }

    if (!/^(98|97)\d{8}$/.test(values.phone)) {
      errors.phone = 'invalid phone no'
    }
    if (values.firstname.length < 1) {
      errors.firstname = '*required'
    }
    if (values.lastname.length < 1) {
      errors.lastname = '*required'
    }
    if (values.address.length < 1) {
      errors.address = '*required'
    }
    if (values.password.length < 6) {
      errors.password = 'must be greater than 6 characters'
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
      errors.email = 'invalid email address'
    }

    return errors
  }

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { mx: 1, width: '30ch' },

        backgroundColor: '#f0ebec',
        padding: '2% 3%',
        width: '95%',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
        margin: 'auto',
        marginTop: '1%',
        textAlign: 'center',
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h5' align='center' gutterBottom>
        REGISTER
      </Typography>
      <hr style={{ margin: '0' }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <img
            height='300px'
            width='400px'
            src={
              userDetails.photo
                ? URL.createObjectURL(userDetails.photo)
                : noPhoto
            }
            alt='rentNepal'
            style={{ marginTop: '20px' }}
          />
          <div>
            <Button
              sx={{ my: '2%' }}
              variant='outlined'
              component='label'
              startIcon={<AddAPhotoIcon />}
            >
              <input
                hidden
                accept='image/png, image/jpeg, image/jpg'
                type='file'
                onChange={(e) =>
                  setuserDetails({
                    ...userDetails,
                    photo: e.target.files[0],
                  })
                }
              />
              upload photo
            </Button>
            &nbsp;
            {!!userDetails.photo ? (
              ''
            ) : (
              <p style={{ color: 'red' }}>{formErrors.photo}</p>
            )}
          </div>
        </Grid>
        <Grid item xs={12} md={7} mt={2}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6}>
                <TextField
                  error={!!formErrors.firstname}
                  value={userDetails.firstname}
                  helperText={formErrors.firstname ? formErrors.firstname : ''}
                  label='first name'
                  name='firstname'
                  variant='standard'
                  onChange={handleChange}
                  // onChange={(e) => {
                  //   setuserDetails({
                  //     ...userDetails,
                  //     firstname: e.target.value,
                  //   })
                  // }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={!!formErrors.lastname}
                  // error={}
                  value={userDetails.lastname}
                  helperText={formErrors.lastname ? formErrors.lastname : ''}
                  label='last name'
                  name='lastname'
                  variant='standard'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  // error={!!formErrors.email}
                  error={!!formErrors.email}
                  value={userDetails.email}
                  label='email'
                  name='email'
                  type='email'
                  helperText={formErrors.email ? formErrors.email : ''}
                  variant='standard'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                {' '}
                <TextField
                  error={!!formErrors.password}
                  value={userDetails.password}
                  label='password'
                  name='password'
                  type='password'
                  helperText={formErrors.password ? formErrors.password : ''}
                  variant='standard'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={!!formErrors.address}
                  value={userDetails.address}
                  helperText={formErrors.address ? formErrors.address : ''}
                  label='address'
                  name='address'
                  variant='standard'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  error={!!formErrors.phone}
                  value={userDetails.phone}
                  label='mobile no.'
                  id='registerPhone'
                  name='phone'
                  type='number'
                  helperText={formErrors.phone ? formErrors.phone : ''}
                  variant='standard'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant='standard' sx={{ m: 1, width: '30ch' }}>
                  <InputLabel id='demo-simple-select-standard-label'>
                    Gender
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    name='gender'
                    value={userDetails.gender}
                    onChange={handleChange}
                    label='Gender'
                  >
                    <MenuItem value='male'>Male</MenuItem>
                    <MenuItem value='female'>Female</MenuItem>
                    <MenuItem value='other'>Other</MenuItem>
                  </Select>
                  <FormHelperText sx={{ color: 'red' }}>
                    {formErrors.gender}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            <FormControlLabel
              control={<Checkbox />}
              onChange={(e) => setisChecked(e.target.checked)}
              label='I accept the Terms Of Service and Privacy Policy'
            />
            {!isChecked ? (
              <p style={{ color: '#d32f2f', margin: '0%' }}>
                {formErrors.checkbox}
              </p>
            ) : (
              ''
            )}
            <br />{' '}
            {serverAuthError ? (
              <Alert
                severity='warning'
                variant='standard'
                sx={{
                  width: '70%',
                  justifyContent: 'center',
                  margin: 'auto',
                }}
              >
                {serverAuthError}!
              </Alert>
            ) : (
              ''
            )}
            <Button
              variant='contained'
              color='error'
              sx={{ display: 'block', margin: 'auto' }}
              type='submit'
            >
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  )
}
