import React from 'react'

const Btn = ({value,width,type,bg}) => {
  return (
    <button className={`text-white text-lg px-4 pt-1 pb-2 bg-${bg || 'red-500'} rounded-lg w-${width}`} type={type}>{value}</button>
  )
}

export default Btn