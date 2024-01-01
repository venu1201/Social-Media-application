import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navigationbar/Navbar';
import TopNavbar from '../../components/navigationbar/TopNavbar'
import DownNavbar from '../../components/navigationbar/DownNavbar'
const HomeLayout = () => {
    const authdata=useSelector((state)=>state.authData);
    const navigate=useNavigate();
    useEffect(() => {
        if(authdata===null)
        {
            navigate('/Auth/Signin');
        }
    }, [authdata])
    
    
  return (
    <div className='h-full w-screen flex xmedium:flex-row flex-col '>
        <section className='Small:w-[250px] w-[90px] xmedium:flex hidden h-full '>
            <Navbar/>
        </section>
        <div className='xmedium:hidden  flex justify-center items-center h-[70px]'>
            <TopNavbar/>
        </div>
        <div className='Small:w-[calc(100%-250px)] xmedium:w-[calc(100%-90px)] w-full flex justify-center h-[calc(100%-120px)] xmedium:h-full    '>
            <Outlet/>
        </div>
        <div className='xmedium:hidden flex h-[50px] '>
            <DownNavbar/>
        </div>
        
        
    </div>
  )
}

export default HomeLayout