import React, { useEffect } from 'react'
import Router from './routes/Router'
import { useQueryClient } from 'react-query'

const App = () => {
  const queryClient = useQueryClient()
  const data = JSON.parse(localStorage.getItem('user'))
  queryClient.setQueryData('user',data)
  return (
    <div className='min-w-fit'>
     <Router/>
    </div>
  )
}

export default App