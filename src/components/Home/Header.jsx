import React, { useState } from "react"
import avatar from "../../assets/Images/avatar.png"
import { useNavigate } from "react-router-dom"
import {useQueryClient} from 'react-query'
import Btn from '../Btn';
const Header = () => {
  const queryClient = useQueryClient()
  const user = queryClient.getQueryData('user')
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full  bg-black sticky top-0 z-10 mb-5">
      <nav className="w-11/12 h-[10vh] mx-auto flex justify-between items-center">
        <span
          className="text-3xl font-extrabold italic text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Movie Time
        </span>
        <div className="relative">
          {!user ? <span onClick={() => navigate('user/login')}><Btn value={'Login'}/></span>:<img src={avatar} alt="prfile-pic" className="w-10 h-10 cursor-pointer" onClick={()=>setIsOpen(!isOpen)}/>}
          {isOpen ? <div className="w-52 text-white absolute top-12 rounded-2xl right-1 flex flex-col items-center space-y-3 bg-gray-800">
            <span className="w-full text-center text-lg font-semibold px-3 py-2 hover:bg-red-500 cursor-pointer rounded-2xl">Profile</span>
            <span className="w-full text-center text-lg font-semibold px-3 py-2 hover:bg-red-500 cursor-pointer rounded-2xl" onClick={() => {
              localStorage.removeItem('user')
              queryClient.removeQueries({queryKey:['user']})
              setIsOpen(false)
              navigate('/')
            }}>Logout</span>
          </div>:<></>}
        </div>
      </nav>
    </div>
  )
}

export default Header
