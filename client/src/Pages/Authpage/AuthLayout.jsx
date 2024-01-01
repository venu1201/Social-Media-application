import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { photo } from '../../assets';

const AuthLayout = () => {
    const authdata=useSelector((state)=>state.authData);
    const navigate=useNavigate();
    useEffect(() => {
      if(authdata)
      {
        navigate('/')
      }
      else
      {
        navigate('/Auth/Signin')
      }
    }, [authdata])
    
   
  return (
    <div className='h-screen w-screen flex justify-around'>
        <section className='Small:w-[40%] w-full z-[1]'>
            <Outlet/>
        </section>
        <div className='h-full Small:opacity-100 opacity-40 z-[-1] Small:w-[55%] w-full absolute Small:relative Small:blur-0 blur-sm Small:pl-4 Small:-rotate-3 flex justify-center items-center  '>
            <img className='h-[120%] min-w-[110%] object-fit ' src={photo} alt="" />
        </div>
    </div>
  )
}

export default AuthLayout