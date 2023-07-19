/* eslint-disable react/prop-types */
import React from 'react'

const LoginWithBtn = ({AuthProvider,text,bg}) => {
  return (
    <div className={`w-full md:w-1/2 flex space-x-3 bg-${bg || 'white'} rounded-3xl justify-center py-2 cursor-pointer`}>
        <AuthProvider size={25}/>
        <span className=''>{text}</span>
    </div>
  )
}

export default LoginWithBtn