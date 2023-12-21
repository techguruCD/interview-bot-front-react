import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AdminRoute({children}) {
  const isAuthenticated = useSelector(state => state.app.token)
  const user = useSelector(state => state.app.user)
  if (!isAuthenticated) {
    return (
      <Navigate to="/" />
    )
  }
  if (!user) {
    return <></>
  }
  if (user.role !== "ADMIN") {
    return (
      <Navigate to="/" />
    )
  }
  return (
    <>{children}</>
  )
}