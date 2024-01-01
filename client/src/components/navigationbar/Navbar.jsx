import React, { useEffect, useState } from 'react'
import { logo2 } from '../../assets'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillHome } from "react-icons/ai";
import { BsFillRocketTakeoffFill, BsFillChatDotsFill } from "react-icons/bs";
import { MdNotificationsActive } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { BiLogOut } from "react-icons/bi";

import { CgProfile, CgAddR } from "react-icons/cg";
import { clear_google } from '../../reducers';
const Navbar = () => {
  const dispatch = useDispatch();
  const array = ["Home", "Explore", "People", "Chat", "Notifications", "Create Post"];
  const [active, setactive] = useState(0);
  const iconarray = [
    <AiFillHome className='h-7 w-7  sm:h-5 sm:w-5' />,
    <BsFillRocketTakeoffFill className='h-7 w-7 sm:h-5 sm:w-5' />,
    <CgProfile className='h-7 w-7 sm:h-5 sm:w-5' />,
    <BsFillChatDotsFill className='h-7 w-7 sm:h-5 sm:w-5' />,
    <MdNotificationsActive className='h-7 w-7 sm:h-5 sm:w-5' />,
    <CgAddR className='h-7 w-7 sm:h-5 sm:w-5' />,
  ]

  const navigate = useNavigate();
  const authData = useSelector((state) => state.authData);
  const location = useLocation();
  if(authData===null)
  {
    navigate('/Auth/Signin')
  }
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
      setactive(2);
    }
    if (location.pathname.includes('/Profile')) {
      setactive(-1);
    }
    if (location.pathname.includes('/Notifications')) {
      setactive(4);
    }
    if (location.pathname.includes('/CreatePost')) {
      setactive(5);
    }


  }, [location])
  const handleclick = (index) => {
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
    <div className='flex  flex-col font-poppins justify-between  bg-gray-950 shadow-md border-r-2 border-cyan-400 gap-7 h-full w-full'>
      <div className='flex flex-col gap-7 w-full'>
        <div onClick={() => navigate('/')} className='flex  mt-5  gap-3 w-full h-[70px] Small:pl-3 pl-4 items-center'>
          <img className='h-[50px] ' src={logo2} alt="" />
          <div className='Small:flex hidden font-serif font-bold text-[23px] justify-center items-center'>
            SocialVerse
          </div>
        </div>
        <div onClick={()=>navigate(`/Profile/${authData.username}`)} className='w-full  flex gap-2 pl-3   h-[60px]'>
            <div className='min-h-[60px]  '>
              <img className='h-[60px] w-[60px] rounded-full' src={authData.profilepicture} alt="" />
            </div>
            <div className='Small:flex hidden w-[calc(100%-80px)]  justify-center gap-1 flex-col  '>
                <div className='flex text-[20px] whitespace-nowrap overflow-ellipsis overflow-scroll w-full font-bold items-center h-[50px]'>
                  {authData.firstname+" "+authData.lastname}
                </div>
                <div className='h-[50px] w-full text-slate-400 whitespace-nowrap overflow-ellipsis overflow-scroll items-start text-[20px]'>
                  {"@"+authData.username}
                </div>
            </div>
        </div>
        <div className='flex flex-col mt-5 w-full gap-8 pl-6  '>
          {array.map((item, index) => (
            <button onClick={() => handleclick(index)} key={index} className={`flex  text-[20px] cursor-pointer  gap-2 ${active === index ? "text-cyan-500" : ""}`} >
              <div className={`flex justify-center ${(item==='Notifications'===true && hasUnseenNotification(authData.Notifications)===true)?"text-red-800 animate-pulse":"animate-none"} items-center`}>
                {iconarray[index]}
              </div>
              <div className={`Small:flex h-full hidden text-[18px]  ${(item==='Notifications'===true && hasUnseenNotification(authData.Notifications)===true)?"text-orange-700 animate-pulse":"animate-none"} justify-center items-center`}>
                {item}
              </div>
            </button>
            
          ))}

        </div>
      </div>
      <div className='flex pl-6 h-[60px]'>
        <button onClick={handlelogout} className='flex h-[50px]  justify-center items-center gap-3'>
        <BiLogOut className='h-7 w-7' />
        <span className='Small:flex hidden text-[17px] justify-center items-center'>Logout</span>
        </button>
      </div>

    </div>
  )
}

export default Navbar