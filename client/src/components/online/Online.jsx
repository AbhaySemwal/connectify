import React from 'react'

const Online = ({user}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className='flex items-center gap-2 mb-4'>
        <div className='mr-2 relative flex'>
            <img className='w-[40px] h-[40px] rounded-full object-cover' src={PF+user.profilePicture} alt=''></img>
            <span className='w-3 h-3 -right-0.5 border-solid border-[2px] border-white rounded-full bg-[#26ff05] absolute'></span>
        </div>
        <span className='text-md'>{user.username}</span>
    </li>
  )
}

export default Online