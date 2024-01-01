import React, { useEffect, useState } from 'react'
import { logo2 } from '../../assets'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHome } from "react-icons/ai";
import { BsFillRocketTakeoffFill, BsFillChatDotsFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

import { CgProfile, CgAddR } from "react-icons/cg";
import { clear_google } from '../../reducers';
const Navbar = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.authData);
  if(authData===null)
  {
    navigate('/Auth/Signin')
  }
  const array = ["Home", "Explore","Create Post", "People", "Profile"];
  const [active, setactive] = useState(0);
  const iconarray = [
    <AiFillHome className='h-7 w-7  sm:h-5 sm:w-5' />,
    <BsFillRocketTakeoffFill className='h-7 w-7 sm:h-5 sm:w-5' />,
    <CgAddR className='h-7 w-7 sm:h-5 sm:w-5' />,

    <CgProfile className='h-7 w-7 sm:h-5 sm:w-5' />,
    <img className='h-7 w-7 rounded-full object-fill' src={authData?.profilepicture}/>
  ]

  const navigate = useNavigate();
  const location = useLocation();
  
  // useEffect(() => {
  //   dispatch(getselfdata(userdata1?.username));
  // }, [location])

  // useEffect(() => {
  //   dispatch(getuserdetails(setuserdata, userdata1?.username));
  // }, [])
  const hasUnseenNotification = (notificationList) => {
    return notificationList.some((notification) => notification.seen === false);
  };
  useEffect(() => {
    if (location.pathname.includes('/')) {
      setactive(0);
    }
    if (location.pathname.includes('/Explore')) {
      setactive(1);
    }
    if (location.pathname.includes('/People')) {
      setactive(3);
    }
    if(location.pathname.includes('/CreatePost'))
    {
      setactive(2);
    }
    if (location.pathname.includes('/Profile')) {
      setactive(-1);
    }

  }, [location])
  const handleclick = (index) => {
    console.log(index)
    setactive(index);
    if (array[index] === 'People') {
      navigate('/People')
    }
    if (array[index] === 'Create Post') {
      navigate('/CreatePost');
    }
    if (array[index] === 'Explore') {
      navigate('/Explore');
    }
    if (array[index] === 'Profile') {
      navigate(`/Profile/${authData?.username}`)

    }
    if (array[index] === 'Home') {
      navigate('/')
    }

    if (array[index] === 'Profile') {
    }

    if (array[index] === 'Settings') {
      navigate('/Settings')

    }
    if (array[index] === 'Notifications') {
      navigate('/Notifications');
    }
  }
  const handlelogout = () => {
    localStorage.removeItem('profile');   
    dispatch(clear_google());
    navigate('/Auth/Signin');
  }
  if(authData===null)
  return
  return (
    <div className='flex  font-poppins   bg-gray-950 gap-2 justify-evenly  h-full w-full'>
        
          {array.map((item, index) => (
            <div onClick={() => handleclick(index)} key={index} className={`flex  text-[20px] cursor-pointer  gap-2 ${active === index ? "text-cyan-500" : ""}`} >
              <div className={`flex justify-center ${(item==='Notifications'===true && hasUnseenNotification(authData.Notifications)===true)?"text-red-800 animate-pulse":"animate-none"} items-center`}>
                {iconarray[index]}
              </div>
              
            </div>
            
          ))}

      

    </div>
  )
}

export default Navbar