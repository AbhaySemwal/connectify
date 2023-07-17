import { MoreVert } from '@mui/icons-material'
import React, { useContext, useState } from 'react'
// import { user } from '../../dummyData';
import { useEffect } from 'react';
// eslint-disable-next-line
import axios from "axios";
import {format} from "timeago.js";
import {Link} from "react-router-dom"
import { AuthContext } from '../../context/AuthContext';

const Post = ({post}) => {
const[like,setLike]=useState(post.likes.length);
const[isLiked,setIsLiked]=useState(false);
const [user,setUser]=useState({});
const PF=process.env.REACT_APP_PUBLIC_FOLDER;
const {user:currentUser}=useContext(AuthContext);
useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
},[currentUser._id,post.likes]);
useEffect(()=>{
    const fetchPosts = async()=>{
      const res=await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    }
    fetchPosts();
  },[post.userId]);
const likeHandler=()=>{
    try{
        axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
    }catch(err){
        console.log(err);
    }
    setLike(isLiked?like-1:like+1);
    setIsLiked(!isLiked);
}
  return (
    <div className='rounded-md shadow-xl my-5'>
        <div className='p-2.5'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                    <Link to={`profile/${user.username}`}>
                      <img className='w-[32px] h-[32px] rounded-full object-cover' src={user.profilePicture?PF+user.profilePicture:PF+"avatar.png"} alt=''></img>  
                    </Link>
                    <span className='font-semibold text-xl'>{user.username}</span>
                    <span className='text-sm'>{format(post.createdAt)}</span>
                </div>
                <div>
                    <MoreVert/>
                </div>
            </div>
            <div className='my-5'>
                <span>{post?.desc}</span>
                <img className='mt-5 max-h-[500px] object-contain' src={PF+post.img} alt=''></img>
            </div>
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-1'>
                    <img className='w-[24px] h-[24px] cursor-pointer' src={`${PF}like.png`} onClick={likeHandler} alt=''></img>
                    <img className='w-[24px] h-[24px] cursor-pointer' src={`${PF}heart.png`} onClick={likeHandler} alt=''></img>
                    <span className='text-sm'>{like} people like it</span>
                </div>
                <div>
                    <span className='text-sm border-b-[1px] border-gray-400 border-dashed'>{post.comment} comments</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Post