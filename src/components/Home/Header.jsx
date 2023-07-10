import React from 'react'
import avatar from '../../assets/Images/avatar.png'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate()
  return (
    <div className='w-full bg-black sticky top-0 z-10 mb-5'>
      <nav className='w-11/12 mx-auto flex justify-between items-center py-3'>
          <span className='text-3xl font-extrabold italic text-red-600 cursor-pointer' onClick={()=>navigate('/')}>Movie Time</span>
          <img src={avatar} alt='prfile-pic' className='w-10 h-10'/>
      </nav>
    </div>
  )
}

export default Header