import React from 'react'

const Closefriend = ({user}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className='flex items-center gap-2'>
        <img className='w-[32px] h-[32px] rounded-full object-cover' src={PF+user.profilePicture} alt=''></img>
        <span>{user.username}</span>
    </li>
  )
}

export default Closefriend;