import React from 'react'
import { Outlet } from 'react-router-dom'

export const EmptyLayout = () => {
  return (
    <div className='h-dvh w-dvw flex justify-center items-center'>
        <Outlet/>
    </div>
  )
}
