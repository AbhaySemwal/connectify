import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Conversation = ({conversation,currentUser}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState(null);

  useEffect(()=>{
    const friendId=conversation.members.find((m)=>m!==currentUser._id);
    const getUser=async()=>{
      try{
        const res=await axios("/users?userId="+friendId);
        setUser(res.data);
      }catch(err)
      {
        console.log(err)
      }
    }
    getUser();
  },[currentUser,conversation]);
  return (
    <div className='flex items-center p-2 gap-5 mt-5 hover:bg-slate-200 cursor-pointer'>
        <img className='w-[40px] h-[40px] rounded-full object-cover' src={user?.profilePicture?PF+user?.profilePicture:PF+"avatar.png"} alt=''></img>
        <span className='font-semibold'>{user?.username}</span>
    </div>
  )
}

export default Conversation