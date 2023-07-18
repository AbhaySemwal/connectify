import React from 'react'

const ChatOnline = () => {
  return (
    <div>
        <div className='flex items-center font-semibold cursor-pointer gap-2 mt-2'>
            <div className='relative'>
                <img className='border-[1px] border-solid border-white w-[32px] h-[32px] rounded-full object-cover' src='https://picsum.photos/200' alt=''></img>
                <div className='absolute bg-[#56e006] border-[2px] border-solid border-white rounded-full p-1 top-0 -right-0.5'></div>
            </div>
            <span>Name name</span>
        </div>
    </div>
  )
}

export default ChatOnline