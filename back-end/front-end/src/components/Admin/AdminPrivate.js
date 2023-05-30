import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const AdminPrivate = () => {
  const auth = localStorage.getItem('admin')

  return auth ? <Outlet /> : <Navigate to='/adminLogin' />
}

export default AdminPrivate
