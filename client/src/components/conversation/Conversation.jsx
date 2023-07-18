import React from 'react'

const Conversation = () => {
  return (
    <div className='flex items-center p-2 gap-5 mt-5 hover:bg-slate-200'>
        <img className='w-[40px] h-[40px] rounded-full object-cover' src='https://picsum.photos/200' alt=''></img>
        <span className='font-semibold'>Name</span>
    </div>
  )
}

export default Conversation