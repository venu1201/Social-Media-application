import React, { useState } from 'react'
import { avatar } from '../../../assets'
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from '../../../components/Spinner/Spinner';

const Networkbox = ({item,user,params,handlebutton,value}) => {
    const navigate=useNavigate();
    const [loading,setloading]=useState(false);
    return (
        <div className={`w-[260px] rounded-lg h-[275px] pt-4 flex flex-col gap-3   bg-slate-950`}>

            <div onClick={() => navigate(`/Profile/${item.username}`)} className='flex justify-center'>
                <img src={item.profilepicture || avatar} className='w-[140px] h-[140px] rounded-full' alt="" />
            </div>
            <div onClick={() => navigate(`/Profile/${item.username}`)} className='flex justify-center'>
                <span className='text-[18px]'>
                    {"@" + item.username}
                </span>
            </div>
            {
                user.username === params.user ? (
                    <div className='flex mt-3 justify-center'>
                        {params.type === "Followers" ? (
                            <button onClick={() => handlebutton(item.username,setloading)} className='text-[22px] bg-red-400 w-[120px] rounded-lg h-[45px]'>
                                {loading === true ? (
                                    <span className='h-full w-full flex justify-center items-center'>
                                        <LoadingSpinner />
                                    </span>
                                ) : (
                                    <span className='h-full w-full flex justify-center items-center'>Remove</span>
                                )}
                            </button>
                        ) : (
                            <button onClick={() => handlebutton(item.username,setloading)} className='text-[22px] bg-orange-500 w-[130px] rounded-lg h-[45px]'>
                                {loading === true ? (
                                    <span className='h-full w-full flex justify-center items-center'>
                                        <LoadingSpinner />
                                    </span>
                                ) : (
                                    <span className='h-full w-full flex justify-center items-center'>
                                        {value}
                                    </span>
                                )}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className={`flex ${user.username === item.username ? "hidden" : ""} mt-3 justify-center`}>
                        <div className='text-[22px] bg-orange-500 w-[130px] rounded-lg h-[45px]'>
                            {user.following.includes(item.username) ? (
                                <button onClick={() => handlebutton(item.username,setloading)} className='text-[22px] bg-red-400 w-full rounded-lg h-[45px]'>
                                    {loading === true ? (
                                        <span className='h-full w-full flex justify-center items-center'>
                                            <LoadingSpinner />
                                        </span>
                                    ) : (
                                        <span className='h-full w-full flex justify-center items-center'>following</span>
                                    )}
                                </button>
                            ) : (
                                <button onClick={() => handlebutton(item.username,setloading)} className='text-[22px] bg-orange-500 w-full rounded-lg h-[45px]'>
                                    {loading === true ? (
                                        <span className='h-full w-full flex justify-center items-center'>
                                            <LoadingSpinner />
                                        </span>
                                    ) : (
                                        <span className='h-full w-full flex justify-center items-center'>
                                            Add
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
                )
            }

        </div >
    )
}

export default Networkbox