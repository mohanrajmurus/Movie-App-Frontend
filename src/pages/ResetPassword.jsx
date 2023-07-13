import React, { useState } from "react"
import Btn from "../components/Btn"
import axios from "../utils/axios"
import { useNavigate } from "react-router-dom"
const ResetPassword = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [id, setid] = useState(undefined)
  const [password, setPassword] = useState("")
  const [isUser, setIsUser] = useState(false)
  const [errorMsg,setErrorMsg] = useState('')
  const findUser = async (e) => {
    e.preventDefault()
   try {
    const { data } = await axios.get(`/user/${email}`)
    setid(data.id)
    setIsUser(true)
    setErrorMsg('')
   } catch (error) {
    //console.log(error.response.data);
    setErrorMsg(error.response.data)
   }
  }
  const resetPassword = async (e) => {
    e.preventDefault()
    await axios.put(`/user/${id}`, { password })
    setErrorMsg('Password changed sucessfully')
    navigate('/user/login')
  }

  console.log(id)
  return (
    <div className="w-full lg:w-11/12 mx-auto">
      <div className="mx-auto w-full  lg:w-1/2">
        <div className="w-11/12 lg:w-full flex flex-col items-center space-y-8 mx-auto">
          <span className="text-white text-3xl font-bold">Reset Password</span>
          <span className="text-gray-300 italic">
            Enter the username associated with your account to change your
            password.
          </span>
          {errorMsg?.length && <span className="text-red-500 text-sm">{errorMsg}</span>}
          {isUser ? (
            <form className="w-full md:w-1/2" onSubmit={resetPassword}>
              <input
                type="email"
                placeholder="Enter an Email"
                className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
                value={email}
                disabled
              />
              <input
                type="password"
                placeholder="Enter a new password"
                className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Btn value={"Reset Password"} type={"submit"} width={"full"} />
            </form>
          ) : (
            <form className="w-full md:w-1/2" onSubmit={findUser}>
              <input
                type={"email"}
                placeholder="Enter an Email"
                className="w-full px-3 py-2 rounded-xl outline-none border-2 focus:border-red-300 mb-4"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Btn value={"Find User"} type={"submit"} width={"full"} />
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
