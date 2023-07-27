import React from 'react'
import Header from '../components/Home/Header'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
const Layout = () => {
  return (
    <div className='w-full'>
        <Header/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Layout