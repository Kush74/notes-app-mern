import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Layout = ({children}) => {
  return (
    

    <div className='flex flex-col min-h-screen max-w-78'>
        <header className='bg-slate-100 text-gray-800 p-4'>
            <nav className='flex justify-between'>
                <div className='font-semibold'>SORT</div>
                <NavLink to="/" className="font-semibold hover:underline">Note App</NavLink>
                <NavLink to="/new" className="font-semibold hover:underline btn-cta text-sm">+New</NavLink>
            </nav>
        </header>
        <main className=' flex-1 bg-slate-200 px-8 flex justify-center'>{children}</main>
        <footer>
          <div className='bg-slate-100 text-gray-800 p-4'>Notes Footer</div>
        </footer>
    </div>
    
  )
}
