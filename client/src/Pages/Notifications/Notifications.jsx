import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { UpdateNotifications } from '../../api';
import { update_authData } from '../../reducers';
import { useNavigate } from 'react-router-dom';
import { MdOutlineNotificationAdd } from "react-icons/md";


const Notifications = () => {
  const authData = useSelector((state) => state.authData);
  const dispatch=useDispatch();
  useEffect(() => {
    const updateNotifications=async()=>{
      try {
        const response=await UpdateNotifications(authData.username);
        dispatch(update_authData(response.data));
      } catch (error) {
        console.log(error);
      }
    }
    const timeoutId = setTimeout(updateNotifications, 10000);

    // Cleanup the timeout to avoid unintended behavior
    return () => clearTimeout(timeoutId); 
   }, [])
  const navigate=useNavigate();
  return (
    <div className='w-full overflow-scroll h-full flex justify-center items-center font-mono' >
      <div className='w-[95%] flex flex-col gap-3 h-[90%]'>
      {[...authData.Notifications].reverse().map((item,index)=>(
        <div key={index}  className={`w-full text-[18px] min-h-[100px] items-center px-5 flex ${item.seen===false?"bg-dimBlue animate-pulse":"animate-none bg-slate-950"} rounded-2xl`}>
          <div className='mr-3'><MdOutlineNotificationAdd /></div>
          <div className='flex flex-wrap'>
          <span onClick={()=>navigate(`/Profile/${item.username}`)} className='font-bold mr-3 cursor-pointer text-orange-700'>{item.username}</span>
           <span className='mr-3'>{item.message}</span>
            <span onClick={()=>navigate(`/Post/${item.postId}`)} className={`font-bold cursor-pointer text-orange-700 ${item.postId===null?"hidden":""}`}>{item?.postId}</span>
          </div>

        </div>
      ))}
      </div>
      


    </div>
  )
}

export default Notifications