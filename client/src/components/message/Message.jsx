import React from 'react'
import {format} from "timeago.js";

const Message = ({own,message}) => {
  return (
    <div className={`${own?"items-end":"items-start"} flex flex-col mt-5`}>
        <div className={`${own?"flex-row-reverse":"flex-row"} flex gap-2`}>
            <img className='w-[32px] h-[32px] rounded-full object-cover' src='https://picsum.photos/200' alt=''></img>
            <p className={`${own? "bg-gray-300 text-black" : "bg-blue-600 text-white"} p-2 items-end rounded-2xl  max-w-[300px]`}>{message.text}</p>
        </div>
        <div className='mt-2 text-xs'>
            {format(message.createdAt)}
        </div>
    </div>
  )
}

export default Message