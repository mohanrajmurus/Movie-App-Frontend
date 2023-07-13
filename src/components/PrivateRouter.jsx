import React from "react"
import { Navigate, Outlet } from "react-router-dom"
const PrivateRouter = () => {
  const authToken = JSON.parse(localStorage.getItem("user"))?.token

  return authToken ? <Outlet /> : <Navigate to={"user/login"} />
}

export default PrivateRouter
