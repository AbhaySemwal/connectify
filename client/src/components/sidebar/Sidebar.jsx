import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from '@mui/icons-material'
import React from 'react'
import { Users } from '../../dummyData'
import Closefriend from '../closefriend/Closefriend'

const Sidebar = () => {
  return (
    <div className='h-[calc(100vh-50px)] flex-[3] scrollbar overflow-y-scroll'>
        <div className='flex flex-col p-5 gap-5'>
            <ul className='text-lg p-0 m-0 flex flex-col gap-5'>
                <li className='flex items-center gap-2'>
                    <RssFeed/>
                    <span>Feed</span>
                </li>
                <li className='flex items-center gap-2'>
                    <Chat/>
                    <span>Chats</span>
                </li>
                <li className='flex items-center gap-2'>
                    <PlayCircleFilledOutlined/>
                    <span>Videos</span>
                </li>
                <li className='flex items-center gap-2'>
                    <Group/>
                    <span>Groups</span>
                </li>
                <li className='flex items-center gap-2'>
                    <Bookmark/>
                    <span>Bookmarks</span>
                </li>
                <li className='flex items-center gap-2'>
                    <HelpOutline/>
                    <span>Questions</span>
                </li>
                <li className='flex items-center gap-2'>
                    <WorkOutline/>
                    <span>Jobs</span>
                </li>
                <li className='flex items-center gap-2'>
                    <Event/>
                    <span>Events</span>
                </li>
                <li className='flex items-center gap-2'>
                    <School/>
                    <span>Courses</span>
                </li>
            </ul>
            <button className='w-[150px] border-none p-2 rounded-md font-semibold bg-gray-300'>Show More</button>
            <hr className="h-0.5 bg-gray-300"/>
            <ul className='text-lg p-0 m-0 flex flex-col gap-5'>
                {Users.map((u)=>(
                    <Closefriend key={u.id} user={u}/>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar