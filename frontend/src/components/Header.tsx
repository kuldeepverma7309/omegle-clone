import React from 'react'
import { Link } from 'react-router-dom'
import { ModeToggle } from './mode-toggle'

const Header = () => {
  return (
    <div className='w-full shadow-sm border-b flex items-center justify-center'>
        <nav className=' w-[11/12] flex justify-between items-center'>
            <ModeToggle />
            <ul className='flex justify-center gap-4'>
                <li><Link to={'/'} className='text-center hover:underline font-semibold hover:bg-slate-800 p-2'>Home</Link></li>
                <li><Link to={'/video-call'} className='text-center hover:underline font-semibold hover:bg-slate-800 p-2'>video call</Link></li>
            </ul>
        </nav>
    </div>
  )
}

export default Header