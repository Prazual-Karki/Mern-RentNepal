import * as React from 'react'
import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Avatar, Button, Grid, Typography } from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'

import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function ValidationTextFields() {
  const params = useParams()

  const id = useLocation().pathname.split('/')[3]
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
        `http://localhost:8080/getUserDetails/${params.id}`,
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

    setuserDetails({
      ...userDetails,
      [name]: value,
    })

    // var src = URL.createObjectURL(event.target.files[0]);
    // imgRef.current.src = src;
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

        const response = await axios.patch(
          'http://localhost:8080/updateUserProfile/' + params.id,
          formData,
          {
            headers: {
              authorization: `bearer ${localStorage.getItem('token')}`,
            },
          }
        )
        if (response.status === 200) {
          console.log('user updated succesfully')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  // useEffect(() => {
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(userDetails)
  //     alert('updated succesfully')
  //   }
  // }, [formErrors])

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
        padding: '2% 1%',
        maxWidth: '600px',
        width: '100%',
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
        PROFILE
      </Typography>
      <hr />
      <img
        src={profilePic}
        alt='pic'
        height='150px'
        width='150px'
        style={{ borderRadius: '50%' }}
      />
      <Typography variant='h6' component='div' textAlign='center'>
        {/* <Avatar
          alt={userDetails.firstname.toUpperCase()}
          src={profilePic}
          // http://localhost:8080/uploads/IMG_20200111_075855.jpg
          sx={{ width: 150, height: 150, mr: 2, margin: 'auto' }}
        /> */}
        {userDetails.email}
      </Typography>

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
            accept='image/*'
            type='file'
            onChange={(e) => setuploadedFile(e.target.files[0])}
          />
          Change photo
        </Button>
        {uploadedFile ? uploadedFile.name : ''}
        {/* {true ? (
          <div
            style={{
              position: "absolute",
              display: "inline"
            }}
          >
            <img
              style={{ height: "40px", width: "40px", borderRadius: "25px" }}
              src={URL.createObjectURL(userDetails.photo.files[0])}
              alt="profile pic"
            />
          </div>
        ) : (
          ""
        )} */}
      </div>

      <Button
        variant='contained'
        color='warning'
        sx={{ display: 'block', margin: 'auto', mt: 2 }}
        onClick={handleUpdate}
      >
        UPDATE
      </Button>
    </Box>
  )
}
