import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import LoginWithBtn from "../components/LoginWithBtn"
import Btn from "../components/Btn"
import {useMutation} from 'react-query'
import {createAccount} from '../util/reactQuery'
const RegisterUser = () => {
  const {isLoading,mutate} = useMutation(createAccount,{
    onSuccess:() => {
      navigate('login')
    },
    onError:(err) => {
      throw new Error(err)
    }
  })
  const navigate = useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  })

  const hanldeChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
 const submitData = (e) => {
  e.preventDefault();
  mutate(user)
  setUser({
    name: "",
    email: "",
    password: "",
  })
 }
  return (
    <div className="w-11/12 mx-auto">
      <div className="w-full ml-4 lg:w-1/2 lg:mx-auto">
        <div className="w-full flex flex-col items-center space-y-8">
          {isLoading ? <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>:<></>}
          <span className="text-white text-2xl font-bold">Create Account</span>
          <LoginWithBtn AuthProvider={FcGoogle} text={"Signup With Google"} />
          <LoginWithBtn AuthProvider={FaApple} text={"Signup With Apple"} />
          <span className="text-white">or</span>
          
          <form className="w-full md:w-1/2" onSubmit={submitData}>
            <input
              type="text"
              className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
              placeholder="Enter a Name"
              required
              name="name"
              value={user.name}
              onChange={hanldeChange}
            />
            <input
              type="email"
              className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
              placeholder="Enter an Email"
              required
              name="email"
              value={user.email}
              onChange={hanldeChange}
            />
            <input
              type="password"
              className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
              placeholder="EnterA Password"
              required
              name="password"
              value={user.password}
              onChange={hanldeChange}
            />
            <Btn value={"Create Account"} type={"submit"} width={"full"} />
          </form>
          <span className="text-gray-200">
            Already have an account with us?{" "}
            <span
              className="text-sky-400 hover:underline cursor-pointer"
              onClick={() => navigate("/user/login")}
            >
              Login
            </span>
          </span>
        </div>
      </div>
      <Outlet />
    </div>
  )
}

export default RegisterUser
