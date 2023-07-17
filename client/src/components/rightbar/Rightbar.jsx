import React, { useContext, useEffect, useState } from 'react'
import Online from '../online/Online'
import { Users } from '../../dummyData';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { Add, Remove } from '@mui/icons-material';

const Rightbar = ({user}) => {
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends,setFriends]=useState([]);
  const {user:currentUser,dispatch}=useContext(AuthContext);
  const [followed,setFollowed]=useState(currentUser.following.includes(user?._id));

  useEffect(()=>{
    setFollowed(currentUser.following.includes(user?._id))
  },[currentUser])

  useEffect(()=>{
    const getFriends=async()=>{
      try{
        const friendList=await axios.get("/users/friends/"+user._id);
        setFriends(friendList.data);
      }
      catch(err){
          console.log(err);
      }
    };
    getFriends();
  },[user]);

  const handleClick=async()=>{
    try{
        if(followed)
        {
          await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id});
          dispatch({type:"UNFOLLOW",payload:user._id})
        }
        else
        {
            await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id});
            dispatch({type:"FOLLOW",payload:user._id})
        }
    } 
    catch(err)
    {
      console.log(err);
    }
    setFollowed(!followed);
  }

  const HomeRightbar=()=>{
    return(
      <>
        <div className='flex items-center'>
            <img className='w-[40px] h-[40px]' src={`${PF}gift.png`}  alt=''></img>
            <span className=''>
              <b>Selena Gomez</b> and <b>3 other friends</b> have birthday today
            </span>
        </div>
        <img className='rounded-lg my-7' src='assets/ad.png' alt=''></img>
        <h4 className='font-semibold text-lg mb-5'>Online Friends</h4>
        <ul>
            {
              Users.map(u=>(
                <Online user={u} key={u.id}/>
              ))
            }
        </ul>
      </>
    );
  }
  const ProfileRightbar=()=>{
    return(
      <>
      {user.username!==currentUser.username &&
        (
          <button onClick={handleClick} className='flex items-center justify-center bg-blue-600 text-white py-1 px-2.5 rounded-md'>
              {followed?"Unfollow":"Follow"}
              {followed?<Remove fontSize='small'/>:<Add fontSize='small'/>}
          </button>
        )
      }
        <h4 className='font-semibold text-lg mb-1'>User Information</h4>
            <div className='mb-2 flex flex-col gap-2'>
              <div className='flex gap-3'>
                <span className='text-[#584f4f] font-medium'>City:</span>
                <span className='font-light'>{user.city}</span>
              </div>
              <div className='flex gap-3'>
                <span className='text-[#584f4f] font-medium'>From:</span>
                <span className='font-light'>{user.from}</span>
              </div>
              <div className='flex gap-3'>
                <span className='text-[#584f4f] font-medium'>Relationship:</span>
                <span className='font-light'>{user.relationship===1?"Single":user.relationship==="2"?"Married":"-"}</span>
              </div>
          </div>
          <h4 className='font-semibold text-lg mb-1'>User Friends</h4>
          <div className='flex flex-wrap gap-5 justify-between'>
          {
            friends.map(friend=>(
              <Link to={"/profile/"+friend.username}>
                <div className='flex flex-col cursor-pointer'>
                  <img className='w-[100px] h-[100px] object-cover rounded' src={friend.profilePicture?PF+friend.profilePicture:PF+"avatar.png"} alt=''></img>
                  <span>{friend.username}</span>
                </div>
              </Link>
            ))
          }
          </div>
      </>
    );
  }
  return (
    <div className='flex-[3.5]'>
      <div className='mr-2 pt-5 pr-5'>
          {user?<ProfileRightbar/>:<HomeRightbar/>}
      </div>
    </div>
  )
}

export default Rightbar