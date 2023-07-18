import React, { useEffect, useState } from 'react'
import axios from 'axios';

const ChatOnline = ({onlineUsers,currentId,setCurrentChat}) => {

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends]=useState([]);
  const [onlineFriends,setOnlineFriends]=useState([]);

  useEffect(()=>{
    const getFriends=async()=>{
      const res=await axios.get("/users/friends/"+currentId);
      setFriends(res.data)
    }
    getFriends();
  },[])

  useEffect(()=>{
    setOnlineFriends(friends.filter(f=>onlineUsers.includes(f._id)));
  },[onlineUsers,friends]);

  const handleClick=async(user)=>{
    try{
      const res=await axios.get(`/conversations/find/${currentId}/${user._id}`);
      setCurrentChat(res.data);
    }catch(err){
      console.log(err)
    }
  }

  return (
    <>
    {
        onlineFriends.map((o)=>(
          <div className='flex items-center font-semibold cursor-pointer gap-2 mt-2' onClick={()=>handleClick(o)}>
              <div className='relative'>
                  <img className='border-[1px] border-solid border-white w-[32px] h-[32px] rounded-full object-cover' src={o.profilePicture?PF+o.profilePicture:PF+"avatar.png"} alt=''></img>
                  <div className='absolute bg-[#56e006] border-[2px] border-solid border-white rounded-full p-1 top-0 -right-0.5'></div>
              </div>
              <span>{o.username}</span>
          </div>
        ))
    }
    </>
  )
}

export default ChatOnline