import { render, fireEvent, act, waitFor } from '@testing-library/react'
import axios from 'axios'
import RegisterForm from '../components/Register'

describe('RegisterForm', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'post')
  })

  afterEach(() => {
    axios.post.mockRestore()
  })

  it('registers successfully when all fields are valid', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'Register successful' },
    })

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    )

    const firstNameInput = getByLabelText('First Name')
    const lastNameInput = getByLabelText('Last Name')
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const addressInput = getByLabelText('Address')
    const mobileInput = getByLabelText('Mobile No.')
    const genderInput = getByLabelText('Gender')
    const photoInput = getByLabelText('Photo Name')
    const submitButton = getByText('Register')

    fireEvent.change(firstNameInput, { target: { value: 'khuman' } })
    fireEvent.change(lastNameInput, { target: { value: 'thapa' } })
    fireEvent.change(emailInput, { target: { value: 'khumsmqr058@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'khuman12345' } })
    fireEvent.change(addressInput, { target: { value: 'kirtipur' } })
    fireEvent.change(mobileInput, { target: { value: '9800122345' } })
    fireEvent.change(genderInput, { target: { value: 'male' } })
    fireEvent.change(photoInput, { target: { value: 'messi.jpg' } })
    fireEvent.click(submitButton)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/signup', {
      firstName: 'khuman',
      lastName: 'thapa',
      email: 'khumsmqr058@gmail.com',
      password: 'khuman12345',
      address: 'kirtipur',
      mobile: '9800122345',
      gender: 'male',
      photo: 'messi.jpg',
    })

    await act(async () => {
      const message = await waitFor(() => getByText('Register successful'))
      expect(message).toBeInTheDocument()
    })
  })
  it('registers failed when registered with existing gmail', async () => {
    axios.post.mockResolvedValueOnce({
      data: { message: 'User already exist with this email' },
    })

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<RegisterForm />} />
        </Routes>
      </BrowserRouter>
    )

    const firstNameInput = getByLabelText('First Name')
    const lastNameInput = getByLabelText('Last Name')
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const addressInput = getByLabelText('Address')
    const mobileInput = getByLabelText('Mobile No.')
    const genderInput = getByLabelText('Gender')
    const photoInput = getByLabelText('Photo Name')
    const submitButton = getByText('Register')

    fireEvent.change(firstNameInput, { target: { value: 'khaman' } })
    fireEvent.change(lastNameInput, { target: { value: 'shrestha' } })
    fireEvent.change(emailInput, { target: { value: 'khumsmqr058@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'khuman123' } })
    fireEvent.change(addressInput, { target: { value: 'lalitpur' } })
    fireEvent.change(mobileInput, { target: { value: '9800122345' } })
    fireEvent.change(genderInput, { target: { value: 'male' } })
    fireEvent.change(photoInput, { target: { value: 'roshan.jpg' } })
    fireEvent.click(submitButton)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/signup', {
      firstName: 'khaman',
      lastName: 'shrestha',
      email: 'khumsmqr058@gmail.com',
      password: 'lalitpur',
      mobile: '9800122345',
      gender: 'male',
      photo: 'roshan.jpg',
    })

    await act(async () => {
      const message = await waitFor(() =>
        getByText('User already exist with this email')
      )
      expect(message).toBeInTheDocument()
    })
  })

  it('shows an error message when the email is invalid', async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />)

    const emailInput = getByLabelText('Email')
    const submitButton = getByText('Register')

    fireEvent.change(emailInput, { target: { value: 'khuman@gmail.c' } })
    fireEvent.click(submitButton)

    const errorMessage = await waitFor(() => getByText('invalid email address'))
    expect(errorMessage).toBeInTheDocument()
  })

  it('shows an error message when the password is too short', async () => {
    const { getByLabelText, getByText } = render(<RegisterForm />)

    const passwordInput = getByLabelText('Password')
    const submitButton = getByText('Register')

    fireEvent.change(passwordInput, { target: { value: 'khum' } })
    fireEvent.click(submitButton)

    const errorMessage = await waitFor(() =>
      getByText('must be greater than 6 characters')
    )
    expect(errorMessage).toBeInTheDocument()
  })
})
