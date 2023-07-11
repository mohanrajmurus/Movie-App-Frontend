import React from 'react'
import { Outlet } from 'react-router-dom'

const RegisterUser = () => {
  return (
    <div className='text-white'>RegisterUser
      <Outlet/>
    </div>
  )
}

export default RegisterUser