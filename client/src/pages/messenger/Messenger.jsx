import React, { useContext, useEffect, useRef, useState } from 'react'
import Topbar from "../../components/topbar/Topbar"
import Conversation from '../../components/conversation/Conversation';
import Message from '../../components/message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import { AuthContext } from '../../context/AuthContext';
import axios from "axios";
import {io} from "socket.io-client";

const Messenger = () => {

  const [conversations,setConversations]=useState([]);
  const [currentChat,setCurrentChat]=useState(null);
  const [messages,setMessages]=useState([]);
  const [newMessage,setNewMessage]=useState("");
  const [arrivalMessage,setArrivalMessage]=useState(null);
  const [onlineUsers,setOnlineUsers]=useState([]);
  const socket=useRef();
  const {user}=useContext(AuthContext);
  const scrollRef=useRef();


  useEffect(()=>{
    socket.current=io("ws://localhost:7000");
    socket.current.on("getMessage",data=>{
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now()
      })
    })
  },[]);


  useEffect(()=>{
    arrivalMessage&&currentChat?.members.includes(arrivalMessage.sender)&&
    setMessages((prev)=>[...prev,arrivalMessage]);
  },[arrivalMessage,currentChat]);

  useEffect(()=>{
    socket.current.emit("addUser",user._id);
    socket.current.on("getUsers",users=>{
      setOnlineUsers(user.following.filter((f)=>users.some(u=>u.userId===f)));
    })
  },[user]);
  
  useEffect(()=>{
    const getConversations=async()=>{
      try{
        const res=await axios.get("/conversations/"+user._id);
        setConversations(res.data);
      }
      catch(err){
        console.log(err)
      }
    }
    getConversations();
  },[user._id]);
  
  useEffect(()=>{
    const getMessages=async()=>{
      try{
        const res=await axios.get("/messages/"+currentChat?._id);
        setMessages(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getMessages();
  },[currentChat]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const message={
      sender:user._id,
      text:newMessage,
      conversationId:currentChat._id,
    }

    const receiverId=currentChat.members.find(member=>member!==user._id)
    socket.current.emit("sendMessage",{
      senderId:user._id,
      receiverId,
      text:newMessage,
    })

    try{
      const res=await axios.post("/messages",message);
      setMessages([...messages,res.data]);
      setMessages([...messages,res.data]);
      setNewMessage(""); 
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  return (
    <>
        <Topbar/>
        <div className='h-[calc(100vh-50px)] flex'>
          <div className='p-2 flex-[3.5]'>
            <input className='outline-none w-[90%] py-2 border-b-[1px] border-solid border-gray-400' placeholder='Search for friends'></input>
            {
              conversations?.map((c)=>(
                <div key={c._id} onClick={()=>{setCurrentChat(c)}}>
                  <Conversation conversation={c} currentUser={user}/>
                </div>

              ))
            }
          </div>
          <div className='p-2 flex-[5.5] '>
            <div className='flex flex-col justify-between h-full'>
          {
            currentChat?
            <>
              <div className='overflow-y-scroll scrollbar pr-2'>
              {
                messages?.map((m)=>(
                  <div key={m._id} ref={scrollRef}>
                    <Message message={m} own={m.sender===user._id}/>
                  </div>
                ))
              }
              </div>
              <div className='mt-1 flex items-center justify-between'>
                <textarea placeholder='write something...' onChange={(e)=>setNewMessage(e.target.value)}
                  value={newMessage}
                 className='outline-none border-gray-400 border-[1px] w-[80%] h-[90px] p-2'></textarea>
                <button className='rounded-md bg-gray-600 p-3 text-white' onClick={handleSubmit}>Send</button>
              </div>
            </>:
              <span className='max-w-[80%] relative top-[30%] text-5xl self-center text-center text-[#bbb]'>Open a conversation to start a chat</span>
          }
            </div>
          </div>
          <div className='p-2 flex-[3]'>
            <div>
              <ChatOnline 
                onlineUsers={onlineUsers}
                currentId={user._id}
                setCurrentChat={setCurrentChat}
              />
            </div>
          </div>
        </div>
    </>
  )
}

export default Messenger;