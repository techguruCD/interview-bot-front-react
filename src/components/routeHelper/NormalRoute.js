import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function NormalRoute({ children }) {
  const user = useSelector(state => state.app.user)
  if (user?.role === 'ADMIN') {
    return (
      <Navigate to="/admin/users" />
    )
  }
  return (
    <>
      {children}
    </>
  )
}