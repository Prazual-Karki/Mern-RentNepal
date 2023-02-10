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
} from '@mui/material'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto'
import { Link, useNavigate } from 'react-router-dom'

export default function ValidationTextFields() {
  const navigate = useNavigate()
  const [userDetails, setuserDetails] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    address: '',
    phone: '',
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

        const response = await axios.post(
          'http://localhost:8080/signup',
          formData
        )
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
    if (auth) {
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
        '& .MuiTextField-root': { m: 1, width: '30ch' },

        backgroundColor: '#E8E8E8',
        padding: '2% 1%',
        width: '100%',
        maxWidth: '600px',
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.2) ',
        margin: 'auto',
        marginTop: '1%',
      }}
      noValidate
      autoComplete='off'
    >
      <Typography variant='h5' align='center' gutterBottom>
        REGISTER
      </Typography>

      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            error={!!formErrors.firstname}
            value={userDetails.firstname}
            helperText={formErrors.firstname ? formErrors.firstname : ''}
            label='first name'
            name='firstname'
            variant='standard'
            onChange={handleChange}
          />

          <TextField
            error={!!formErrors.lastname}
            value={userDetails.lastname}
            helperText={formErrors.lastname ? formErrors.lastname : ''}
            label='last name'
            name='lastname'
            variant='standard'
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            error={!!formErrors.email}
            value={userDetails.email}
            label='email'
            name='email'
            type='email'
            helperText={formErrors.email ? formErrors.email : ''}
            variant='standard'
            onChange={handleChange}
          />

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
        </div>
        <div>
          <TextField
            error={!!formErrors.address}
            value={userDetails.address}
            helperText={formErrors.address ? formErrors.address : ''}
            label='address'
            name='address'
            variant='standard'
            onChange={handleChange}
          />

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
        </div>
        <br />
        <div>
          <Button
            variant='outlined'
            component='label'
            startIcon={<AddAPhotoIcon />}
          >
            <input
              hidden
              accept='image/*'
              type='file'
              onChange={(e) =>
                setuserDetails({ ...userDetails, photo: e.target.files[0] })
              }
              // onChange={(e) => {
              //   setuserDetails({ photo: e.target.value })
              // }}
            />
            upload photo
          </Button>
          {!!userDetails.photo ? userDetails.photo.name : formErrors.photo}
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
            variant='outlined'
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
          sx={{ display: 'block', margin: 'auto', mt: 1 }}
          type='submit'
        >
          Register
        </Button>
      </form>
      <Link to='/login'>
        <Typography variant='body2' textAlign='center' mt={1}>
          already have an account?
        </Typography>
      </Link>
    </Box>
  )
}
