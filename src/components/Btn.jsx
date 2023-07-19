/* eslint-disable react/prop-types */
import React from 'react'

const Btn = ({value,width,type}) => {
  return (
    <button className={`text-white text-lg px-4 pt-1 pb-2 bg-red-600 rounded-lg w-${width}`} type={type}>{value}</button>
  )
}

export default Btn