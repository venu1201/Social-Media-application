import React, { useEffect, useState } from 'react'
// import { getuserbyid } from '../../../actions/Auth'
import {fetchtopheadlines} from '../../../actions/News';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const LatestNews = () => {
    const [random,setrandom]=useState(null);
    const dispatch=useDispatch();
   
    useEffect(() => {
        dispatch(fetchtopheadlines('sports',setrandom));
        // console.log("hmmm")
        
    }, [])
    const navigate=useNavigate();
    const gotonews=()=>{
        navigate('/News')
    }
    console.log(random)
    
  return (
    <div className='min-h-[250px] w-full '>
        <div className='h-[200px] w-full'>
            <img className='h-full w-full  ' src={random?.urlToImage} alt="" />
        </div>
        <div onClick={gotonews} className='h-[50px] flex justify-center items-center text-[21px] cursor-pointer rounded-b-md w-full hover:text-cyan-400 bg-gradient'>
            View More Latest News
        </div>

    </div>
  )
}

export default LatestNews