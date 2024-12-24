import React from 'react'
import { assets } from '../assets/assets.js'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='bg-[#003A10] min-h-screen pl-[4vw] flex flex-col items-center'>
        <img src={assets.logo_small} className='mt-5 w-[50px] hidden sm:block' alt="" />
        <img src={assets.logo_small} className='mt-5 w-[max(5vw,40px)] mr-5 sm:hidden block' alt="" />

        <div className='flex flex-col gap-5 mt-10'>
            <NavLink to='/add-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-3 drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.add_song} className='w-5' alt="" />
                <p> Add Song</p>
            </NavLink>
            <NavLink to='/list-song' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-3 drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.song_icon} className='w-5' alt="" />
                <p> List Song</p>
            </NavLink>
            <NavLink to='add-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-3 drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.add_album} className='w-5' alt="" />
                <p> Add Album</p>
            </NavLink>
            <NavLink to='list-album' className='flex items-center gap-2.5 text-gray-800 bg-white border border-black p-3 drop-shadow-[-4px_4px_#00FF5B] text-sm font-medium'>
                <img src={assets.album_icon} className='w-5' alt="" />
                <p> List Album</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
