import React from 'react'
import { render, fireEvent, act, waitFor } from '@testing-library/react'
import Login from '../components/Login.js'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

jest.mock('axios')

describe('Login', () => {
  beforeEach(() => {
    jest.spyOn(axios, 'post')
  })

  afterEach(() => {
    axios.post.mockRestore()
  })
  it('logs in successfully when the email and password are correct', async () => {
    axios.post.mockResolvedValueOnce({ data: { message: 'Login success' } })

    const { getByLabelText, getByText } = render(
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    )

    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const submitButton = getByText('Login')

    fireEvent.change(emailInput, { target: { value: 'khumsmqr058@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'khuman12345' } })
    fireEvent.click(submitButton)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/login', {
      email: 'khumsmqr058@gmail.com',
      password: 'khuman12345',
    })

    await act(async () => {
      const message = await waitFor(() => getByText('Login success'))
      expect(message).toBeInTheDocument()
    })
  })
  it('displays an error message when the email or password is incorrect', async () => {
    const error = new Error('Invalid email or password')
    axios.post.mockRejectedValueOnce(error)

    const { getByLabelText, getByText } = render(<Login />)

    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')
    const submitButton = getByText('Login')

    fireEvent.change(emailInput, { target: { value: 'khumsmqr058@gmail.com' } })
    fireEvent.change(passwordInput, { target: { value: 'khuman11' } })
    fireEvent.click(submitButton)

    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/login', {
      email: 'khumsmqr058@gmail.com',
      password: 'khuman11',
    })

    await act(async () => {
      const errorMessage = await waitFor(() =>
        getByText('Invalid email or password')
      )
      expect(errorMessage).toBeInTheDocument()
    })
  })
})
