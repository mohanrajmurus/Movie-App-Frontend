import React from 'react'

const LoginWithBtn = ({AuthProvider,text}) => {
  return (
    <div className='w-full md:w-1/2 flex space-x-3 bg-white rounded-3xl justify-center py-2 cursor-pointer'>
        <AuthProvider size={25}/>
        <span className=''>{text}</span>
    </div>
  )
}

export default LoginWithBtn