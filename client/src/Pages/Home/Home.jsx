import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Feeds from './Components/Feeds'
import Features from './Components/Features'
import { getuserbyId } from '../../api'
import { update_authData } from '../../reducers'
const Home = () => {

  const dispatch = useDispatch();
  const data = useSelector((state)=>state.authData);
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!data) {
      navigate('/Auth/Signin');
    } 
  }, [data, navigate]);

  useEffect(() => {
    const fecthUser=async()=>{
      try {
        const response=await getuserbyId(data.username);
        dispatch(update_authData(response.data));
      } catch (error) {
          console.log(error);
      }
    }
    fecthUser();
  }, [])
  

  // console.log(state)

  

  return (
    <div className='h-full font-poppins relative flex w-full '>   
      <div className='xlarge:w-[65%] xSmall:w-[70%] w-full h-full  '>
          <Feeds/>
      </div>
      <div className='xlarge:w-[35%] xSmall:w-[30%] xSmall:flex hidden h-full '>
        <Features/>
      </div>
    </div>
  )
}

export default Home