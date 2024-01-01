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
  if (authData === null) {
    navigate('/Auth/Signin')
  }
  const array = [ "Notifications","Chat"];
  const [active, setactive] = useState(-1);
  const iconarray = [
    <MdNotificationsActive className='h-7 w-7 sm:h-5 sm:w-5' />,
    <BiLogOut className='h-7 w-7 sm:h-5 sm:w-5' />,

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
    

    if (location.pathname.includes('/Notifications')) {
      setactive(4);
    }
    


  }, [location])
  const handleclick = (index) => {
    setactive(index);
    if(index===1)
    {
      handlelogout();
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
  if (authData === null)
    return
  return (
    <div className='flex  font-poppins   bg-slate-950  gap-2 justify-between pr-3  h-full w-full'>
      <div onClick={() => navigate('/')} className='flex gap-2 w-full h-[70px]  pl-2 items-center'>
        <img className='h-[40px] w-[40px] rounded-full ' src={logo2} alt="" />
        <div className='flex  font-serif font-bold text-[23px] justify-center items-center'>
          SocialVerse
        </div>
      </div>
      <div className='flex gap-5'>
        {array.map((item, index) => (
          <div onClick={() => handleclick(index)} key={index} className={`flex  text-[20px] cursor-pointer  gap-2 ${active === index ? "text-cyan-500" : ""}`} >
            <div className={`flex justify-center ${(item === 'Notifications' === true && hasUnseenNotification(authData.Notifications) === true) ? "text-red-800 animate-pulse" : "animate-none"} items-center`}>
              {iconarray[index]}
            </div>

          </div>

        ))}
      </div>




    </div>
  )
}

export default Navbar