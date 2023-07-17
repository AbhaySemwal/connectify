import React from 'react'
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const Profile = () => {
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user,setUser]=useState({});
    const username=useParams().username;

    useEffect(()=>{
        const fetchPosts = async()=>{
        const res=await axios.get(`/users?username=${username}`);
        setUser(res.data);
        }
        fetchPosts();
    },[username]);
  return (
    <>
        <Topbar/>
        <div className='flex'>
            <Sidebar/>
            <div className='flex-[9]'>
                <div className='h-[320px] relative'>
                    <img className='w-[150px] h-[150px] rounded-full absolute left-0 right-0 bg-white top-[150px] border-solid border-white border-[3px] m-auto object-cover' src={user.profilePicture?PF+user.profilePicture:PF+"avatar.png"} alt=''></img>
                    <img className='h-[250px] w-full object-cover' src={user.coverPicture?PF+user.coverPicture:PF+"post/3.jpeg"} alt=''></img>
                </div>
                <div className='flex flex-col items-center justify-center'>
                    <h4 className='font-semibold text-2xl'>{user.username}</h4>
                    <span className=''>{user.desc}</span>
                </div>
                <div className='flex' >
                    <Feed username={username}/>
                    <Rightbar user={user}/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile