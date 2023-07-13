import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FcGoogle } from "react-icons/fc"
import { FaApple } from "react-icons/fa"
import LoginWithBtn from "../components/LoginWithBtn"
import Btn from "../components/Btn"
import {loginAccount} from '../utils/reactQuery'
import {useMutation, useQueryClient} from 'react-query'
const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState(undefined)
  const {mutate,isLoading} = useMutation(loginAccount,{
    onSuccess:(data) => {
      sessionStorage.setItem('user',JSON.stringify(data))
      navigate('/')
      setErrorMsg(undefined)
    },
    onError:(err) => {
      setErrorMsg(err.response.data)
    }
  })
  const navigate = useNavigate()
  const [user, setUser] = useState({
    email:'',
    password:''
  })
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]:e.target.value
    })
  }
  const submitData = (e) => {
    e.preventDefault();
    mutate(user)
    setUser({
      email:'',
    password:''
    })
  }
  return (
    <div className="w-full lg:w-11/12 mx-auto">
      <div className="mx-auto w-full  lg:w-1/2">
        <div className="w-11/12 lg:w-full flex flex-col items-center space-y-8 mx-auto">
        {isLoading ? <div className="border-4 border-gray-300 border-t-sky-400 rounded-full h-10 w-10 animate-spin text-center mt-10"></div>:<></>}
          <span className="text-white text-2xl font-bold">Login</span>
          <LoginWithBtn AuthProvider={FcGoogle} text={"Login With Google"} />
          <LoginWithBtn AuthProvider={FaApple} text={"Login With Apple"} />
          <span className="text-white">or</span>
          {errorMsg && <span className="text-red-500 text-sm italic">{errorMsg}</span>}
          <form className="w-full md:w-1/2" onSubmit={submitData}>
            <input
              type="email"
              className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
              placeholder="Enter an Email"
              required
              value={user.email}
              onChange={handleChange}
              name="email"
            />
            <input
              type="password"
              className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
              placeholder="EnterA Password"
              required
              name="password"
              value={user.password}
              onChange={handleChange}
            />
            <Btn value={"Login"} type={"submit"} width={"full"} />
          </form>
         <div className="w-1/2 md:w-full flex justify-center" onClick={()=> navigate('/user/resetpassword')}>
         <LoginWithBtn AuthProvider={"span"} text={"Forgot Password"} />
         </div>
          <span className="text-gray-200">
            No account with us?{" "}
            <span
              className="text-sky-400 hover:underline cursor-pointer "
              onClick={() => navigate("/user")}
            >
              Signup
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
