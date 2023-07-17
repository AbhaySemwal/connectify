import React, { useContext, useRef, useState } from 'react'
import { Cancel, EmojiEmotions, Label, PermMedia, Room } from '@mui/icons-material'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const Share = () => {
    const desc=useRef();
    const {user}=useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const[file,setFile]=useState(null);
    const submitHandler=async(e)=>{
        e.preventDefault();
        const newPost={
            userId:user._id,
            desc:desc.current.value,
        }
        if(file)
        {
            const data=new FormData();
            const fileName=Date.now()+file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.img=fileName;
            try{
                await axios.post("/upload",data);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        try{
            await axios.post("/posts",newPost);
            window.location.reload();
        }
        catch(err)
        {
            console.log(err);
        }
    }
  return (
    <div className='w-full shadow-xl rounded-lg p-5'>
        <div >
            <div className='flex gap-2 my-1'>
                <img className='w-[50px] h-[50px] object-cover rounded-full' src={user.profilePicture?PF+user.profilePicture:PF+"avatar.png"} alt=''></img>
                <input className='outline-none w-[80%]' placeholder={"What's in your mind "+user.username+ " ?"} ref={desc}></input>
            </div>
            <hr className='my-5'/>
            {
                file&&(
                    <div className='relative mb-5'>
                        <img className='object-cover' src={URL.createObjectURL(file)}></img>
                        <Cancel className='absolute top-2 right-2 cursor-pointer text-white' onClick={()=>setFile(null)}/>
                    </div>
                )
            }
            <form className='flex justify-between' onSubmit={submitHandler}>
                <div className='font-semibold flex items-center gap-3'>
                    <label htmlFor='file' className='flex items-center gap-1 cursor-pointer'>
                        <PermMedia htmlColor='tomato'/>
                        <span>Photo or Video</span>
                        <input className='hidden' type='file' id='file' accept='.png,.jpeg,.jpg' onChange={(e)=>setFile(e.target.files[0])}></input>
                    </label>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <Label htmlColor='blue'/>
                        <span>Tag</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <Room htmlColor='green'/>
                        <span>Location</span>
                    </div>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <EmojiEmotions htmlColor='goldenrod'/>
                        <span>Feelings</span>
                    </div>
                </div>
                <button type='submit' className='p-2 rounded-md bg-green-600 font-semibold text-white '>Share</button>
            </form>
        </div>
    </div>
  )
}

export default Share