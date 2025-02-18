"use client"
import clsx from 'clsx'
import React, { useState } from 'react'
import Link from 'next/link'

const Header = () => {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <nav className='bg-black border-b border-gray-800 p-4 fixed top-0 w-full z-10'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-lg font-bold'>
          <Link href='/'>
            ReelUp
          </Link>
        </div>
        <div className='block lg:hidden'>
          <button className='text-white focus:outline-none' onClick={() => setShowMenu(!showMenu)}>
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
            </svg>
          </button>
        </div>
        <div className='hidden lg:flex space-x-4'>
          <Link href='/register' className='text-white'>Register</Link>
        </div>
      </div>
      <div
        className={clsx(
          'lg:hidden w-[80vw] rounded-xl border border-gray-800 bg-black text-white p-4 absolute top-0 left-1/2 -translate-x-1/2 transition-transform duration-300',
          showMenu ? 'transform translate-y-20' : 'transform -translate-y-full'
        )}
      >
        <Link href='/register' className='block py-2'>Register</Link>
      </div>
    </nav>
  )
}

export default Header