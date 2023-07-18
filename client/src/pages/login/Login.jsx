import React, { useContext, useRef } from 'react'
import { LoginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import {CircularProgress} from "@material-ui/core";
import { Link } from 'react-router-dom';

const Login = () => {
    const email=useRef();
    const password=useRef();
    const {user,isFetching,error,dispatch}=useContext(AuthContext);
    const handleClick =(e)=>{
        e.preventDefault();
        LoginCall({email:email.current.value,password:password.current.value},dispatch);
    }
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-slate-200'>
        <div className='w-[70%] h-[70%] flex'>
            <div className='flex-1 flex flex-col justify-center'>
                <h3 className='font-extrabold text-5xl text-blue-600 mb-4'>Connectify</h3>
                <span className='text-2xl'>Connect with friends and the world around you</span>
            </div>
            <div className='flex-1 flex flex-col justify-center'>
                <form className='h-[300px] p-5 rounded-lg flex flex-col bg-white justify-between' onSubmit={handleClick}>
                    <input className="h-[50px] rounded-lg border-[1px] border-solid border-gray-400 outline-none text-lg pl-5" type='email' ref={email} required placeholder='Email'></input>
                    <input className="h-[50px] rounded-lg border-[1px] border-solid border-gray-400 outline-none text-lg pl-5" type='password' required ref={password} minLength={6} placeholder='Password'></input>
                    <button disabled={isFetching} className='disabled:cursor-not-allowed h-[50px] rounded-lg border-none flex items-center justify-center bg-blue-600 text-white text-lg'>{isFetching?<CircularProgress color="inherit" size={25}/>:"Log In"}</button>
                    <span className='text-center text-blue-600'>Forgot Password?</span>
                    <Link to="/register" disabled={isFetching} className='h-[50px] w-[60%] disabled:cursor-not-allowed self-center rounded-lg border-none flex items-center justify-center bg-[#26ad01] text-white text-lg'><button>{isFetching?<CircularProgress color="inherit" size={25}/>:"Create a New Account"}</button></Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login