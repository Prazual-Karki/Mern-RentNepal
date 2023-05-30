import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Snackbar, Button, Grid, Typography } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import noProfile from '../Product/photos/noProfile.png'
import MuiAlert from '@mui/material/Alert'

import { useParams } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../helper'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

export default function ValidationTextFields() {
  const [open, setOpen] = React.useState(false)
  const params = useParams()

  const [userDetails, setuserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    phone: '',
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
        `${BASE_URL}/getUserDetails/${params.id}`,
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
        setuserDetails(res.data)
        if (res.data.photo) {
          var photoName = res.data.photo.replace('public/', '')
          photoName = `${BASE_URL}/${photoName}`
          setprofilePic(photoName)
        }
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

    setuserDetails({
      ...userDetails,
      [name]: value,
    })
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  const handleUpdate = async (event) => {
    event.preventDefault()
    setformErrors(validateForm(userDetails))
    setisupdate(true)
    if (Object.keys(formErrors).length === 0 && isupdate) {
      try {
        const imageFile = uploadedFile ? uploadedFile : userDetails.photo
        const formData = new FormData()
        formData.append('firstname', userDetails.firstname)
        formData.append('lastname', userDetails.lastname)
        formData.append('address', userDetails.address)
        formData.append('phone', userDetails.phone)
        formData.append('photo', imageFile)
        // if (uploadedFile) {
        //   setprofilePic(URL.createObjectURL(uploadedFile))
        // }
        const response = await axios.patch(
          `${BASE_URL}/updateUserProfile/` + params.id,
          formData,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.status === 200) {
          setOpen(true)

          console.log('user updated succesfully')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const validateForm = (values) => {
    const errors = {}

    if (values.phone.length !== 10) {
      errors.phone = 'phone no. must be of 10 digits'
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

    return errors
  }
  return (
    <Box
      component='form'
      sx={{
        '& .MuiTextField-root': { m: 1, width: '30ch' },

        backgroundColor: '#f0ebec',
        padding: '4% 5%',
        width: '95%',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
        margin: 'auto',
        marginTop: '1%',
        textAlign: 'center',
        marginBottom: '1%',
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h5' align='center'>
        YOUR PROFILE
      </Typography>
      <hr style={{ marginBottom: '5%' }} />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <img
            src={profilePic ? profilePic : noProfile}
            alt='pic'
            height='200px'
            width='200px'
            style={{ borderRadius: '50%' }}
          />
          <Typography variant='h6' component='div' textAlign='center'>
            welcome, {userDetails.email}
          </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
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
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                error={!!formErrors.lastname}
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
                label='phone no.'
                id='registerPhone'
                name='phone'
                type='number'
                helperText={formErrors.phone ? formErrors.phone : ''}
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
                accept='image/png, image/jpeg, image/jpg'
                type='file'
                onChange={(e) => {
                  setuploadedFile(e.target.files[0])
                  setprofilePic(URL.createObjectURL(e.target.files[0]))
                }}
              />
              Change profile picture
            </Button>
          </div>

          <Button
            variant='contained'
            color='warning'
            sx={{ display: 'block', margin: 'auto', mt: 3 }}
            onClick={handleUpdate}
          >
            UPDATE
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Profile updated succesfully!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
    </Box>
  )
}
