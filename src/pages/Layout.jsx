import React from 'react'
import Header from '../components/Home/Header'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='w-full'>
        <Header/>
        <Outlet/>
    </div>
  )
}

export default Layout