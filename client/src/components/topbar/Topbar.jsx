import React, { useContext } from 'react'
import { Search } from '@mui/icons-material'
import { Person } from '@mui/icons-material'
import { Chat } from '@mui/icons-material'
import { Notifications } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const Topbar = () => {
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className='w-full sticky text-white flex gap-5 h-[50px] bg-blue-700 items-center top-0 z-10 justify-center px-5'>
        <div className='w-3/12 font-semibold text-3xl'><Link to="/">Connectify</Link></div>
        <div className='flex w-5/12 items-center'>
            <div className='flex w-full items-center rounded-2xl h-8 gap-1 bg-white px-2 text-black'>
                <Search/>
                <input className='w-full rounded-r-2xl border-0 outline-none' placeholder='Search for a friend, post or video'></input>
            </div>
        </div>
        <div className='font-medium flex items-center justify-between w-4/12'>
            <div className='cursor-pointer flex gap-2 items-center'>
                <span>Homepage</span>
                <span>Timeline</span>
            </div>
            <div className='cursor-pointer flex items-center'>
                <div className='relative mr-5'>
                    <Person/>
                    <span className='absolute -right-1.5 bottom-2.5 bg-red-700 rounded-full px-1 text-xs'>1</span>
                </div>  
                <Link className='relative mr-5' to="/messenger">
                    <Chat/>
                    <span className='absolute -right-2 bottom-2.5 bg-red-700 rounded-full px-1 text-xs'>1</span>
                </Link>  
                <div className='relative mr-5'>
                    <Notifications/>
                    <span className='absolute -right-1.5 bottom-2.5 bg-red-700 rounded-full px-1 text-xs'>1</span>
                </div>  
            </div>
            <Link to={`/profile/${user.username}`}><img className='cursor-pointer rounded-full object-cover w-[32px] h-[32px] bg-white' src={user.profilePicture?PF+user.profilePicture:PF+"avatar.png"} alt=''></img></Link>
        </div>
    </div>
  )
}

export default Topbar