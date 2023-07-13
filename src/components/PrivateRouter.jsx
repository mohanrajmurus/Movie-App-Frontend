import React from "react"
import { Navigate, Outlet } from "react-router-dom"
const PrivateRouter = () => {
  const authToken = JSON.parse(sessionStorage.getItem("user"))?.token

  return (
    <div className="w-full">
      {authToken ? <Outlet /> : <Navigate to={"user/login"} />}
    </div>
  )
}

export default PrivateRouter
