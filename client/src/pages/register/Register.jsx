import React from 'react'
import { Link } from 'react-router-dom';
import {useRef} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const passwordAgain=useRef();
    const navigate=useNavigate(); 
    const handleClick=async(e)=>{
        e.preventDefault();
        if(password.current.value!==passwordAgain.current.value)
        password.current.setCustomValidity("Passwords don't match");
        else
        {
            const user={
                username:username.current.value,
                email:email.current.value,
                password:password.current.value,
            }
            try{
                await axios.post("/auth/register",user);
                navigate("/login");
            }
            catch(err){
                console.log(err);
            }
        }
    }
  return (
    <div className='w-screen h-screen flex items-center justify-center bg-slate-200'>
        <div className='w-[70%] h-[70%] flex'>
            <div className='flex-1 flex flex-col justify-center'>
                <h3 className='font-extrabold text-5xl text-blue-600 mb-4'>Connectify</h3>
                <span className='text-2xl'>Connect with friends and the world around you</span>
            </div>
            <div className='flex-1 flex flex-col justify-center'>
                <form className='h-[400px] p-5 rounded-lg flex flex-col bg-white justify-between' onSubmit={handleClick}>
                    <input className="h-[50px] rounded-lg border-[1px] border-solid border-gray-400 outline-none text-lg pl-5" placeholder='Username' ref={username}></input>
                    <input className="h-[50px] rounded-lg border-[1px] border-solid border-gray-400 outline-none text-lg pl-5" type='email' placeholder='Email' ref={email}></input>
                    <input className="h-[50px] rounded-lg border-[1px] border-solid border-gray-400 outline-none text-lg pl-5" type='password' minLength={6} placeholder='Password' ref={password}></input>
                    <input className="h-[50px] rounded-lg border-[1px] border-solid border-gray-400 outline-none text-lg pl-5" type='password' placeholder='Password again' ref={passwordAgain}></input>
                    <button className='h-[50px] rounded-lg border-none bg-blue-600 text-white text-lg' type='submit'>Sign Up</button>
                    <Link className='h-[50px] w-[60%] self-center cursor-pointer flex items-center justify-center rounded-lg border-none bg-[#26ad01] text-white text-lg' to="/login">Log into Account</Link>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register