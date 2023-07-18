import React from 'react'
import Topbar from "../../components/topbar/Topbar"
import Conversation from '../../components/conversation/Conversation';
import Message from '../message/Message';
import ChatOnline from '../../components/chatOnline/ChatOnline';

const Messenger = () => {
  return (
    <>
        <Topbar/>
        <div className='h-[calc(100vh-50px)] flex'>
          <div className='p-2 flex-[3.5]'>
            <input className='outline-none w-[90%] py-2 border-b-[1px] border-solid border-gray-400' placeholder='Search for friends'></input>
            <Conversation/>
            <Conversation/>
            <Conversation/>
          </div>
          <div className='p-2 flex-[5.5] '>
            <div className='flex flex-col justify-between h-full'>
              <div className='overflow-y-scroll scrollbar pr-2'>
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message own={true}/>
                <Message/>
                <Message/>
                <Message own={true}/>
                <Message/>
              </div>
              <div className='mt-1 flex items-center justify-between'>
                <textarea placeholder='write something...' className='outline-none border-gray-400 border-[1px] w-[80%] h-[90px] p-2'></textarea>
                <button className='rounded-md bg-gray-600 p-3 text-white'>Send</button>
              </div>
            </div>
          </div>
          <div className='p-2 flex-[3]'>
            <div>
              <ChatOnline/>
            </div>
          </div>
        </div>
    </>
  )
}

export default Messenger;