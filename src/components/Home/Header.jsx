import React from "react"
import avatar from "../../assets/Images/avatar.png"
import { useNavigate } from "react-router-dom"
import Btn from '../Btn';
const Header = () => {
  const user = true
  const navigate = useNavigate()
  return (
    <div className="w-full  bg-black sticky top-0 z-10 mb-5">
      <nav className="w-11/12 h-[10vh] mx-auto flex justify-between items-center">
        <span
          className="text-3xl font-extrabold italic text-red-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Movie Time
        </span>
        <div>
          {user ? <span onClick={() => navigate('user/login')}><Btn value={'Login'}/></span>:<img src={avatar} alt="prfile-pic" className="w-10 h-10" />}
        </div>
      </nav>
    </div>
  )
}

export default Header
