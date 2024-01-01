import React, { useState } from 'react'
// import like from '../../../assets/icon/like.svg'
// import liked from '../../../assets/icons/liked.svg'
// import comment from '../../../assets/icons/comment2.svg'
// import save from '../../../assets/icons/save.svg'
// import saved from '../../../assets/icons/saved.svg'
import {SavePost, likeandcomment} from '../../../api/index'
import like from '../../../assets/icons/like.svg'
import liked from '../../../assets/icons/liked.svg'
import { useDispatch, useSelector } from 'react-redux';
import { update_authData } from '../../../reducers/index';

import comment from '../../../assets/icons/comment2.svg'

import save from '../../../assets/icons/save.svg'
import saved from '../../../assets/icons/saved.svg'
import { useNavigate } from 'react-router-dom'


const PostCard = ({item}) => {
    const authData = useSelector((state) => state.authData);

    const tagsTostring=(tags)=>{
        if(tags.length===0)
            return;
        let str='#'+tags[0];
        for(let i=1;i<tags.length;i++)
        {
            str+=' #'+tags[i]
        }
        return str;
    }
    const [load,setload]=useState(false);
    const [load2,setload2]=useState(false);

    const [temp,settemp]=useState(item);
    const handlelikeandcomment = async () => {
        setload(true);
        try {
                const response = await likeandcomment({like:true,comment:{user:{username:authData.username},message:''}}, item._id);
                settemp(response.data.result);
        } catch (error) {
            console.log(error);
        }
        finally {
            setload(false);
        }
    }
    const dispatch=useDispatch();
    const handleSaveButton=async()=>{
        setload2(true);
        try {
            const response=await SavePost(authData.username,item._id);
            dispatch(update_authData(response.data));
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally{
            setload2(false);
        }
    }
    // console.log(item.userInfo)
    const navigate=useNavigate();
  return (
    <div className='w-full   flex flex-col gap-3 overflow-hidden  '>
        <div onClick={()=>navigate(`/Profile/${item.userInfo.username}`)} className='w-full cursor-pointer   gap-2 mt-4 flex h-[60px]'>
            <div className='h-full'>
                <img className='h-[60px] w-[60px] rounded-full' src={item.userInfo.profilepicture} alt="" />
            </div>
            <div className='w-[calc(100%-60px)] flex flex-col'>
                <div className='flex h-[50%] gap-2 items-center text-[24px]'>
                    <span>{item.userInfo.firstname}</span>
                    <span>{item.userInfo.lastname}</span>
                </div>
                <div className='text-[18px] text-slate-400'>
                    <span>{"@"+item.userInfo.username}</span>
                </div>
            </div>
        </div>
        <div className=' whitespace-nowrap h-[25px] overflow-scroll  '>
            {item.description} <span className='text-slate-400'>{tagsTostring(item.tags)}</span>
        </div>
        <div onClick={()=>navigate(`/Post/${item._id}`)} className='w-full cursor-pointer xmedium:h-[530px] medium:h-[500px] tiny:h-[430px] h-[350px]'>
            <img className='h-full w-full object-fill' src={item.selectedfile} alt="" />
        </div>
        <div className='flex text-[20px] h-[60px] justify-between'>
            <div className='flex gap-3'>
                <div className='flex gap-2 justify-center items-start'>
                    <span className='flex justify-center items-center text-center mt-1 '>{temp.likeCount.length}</span>
                    <button onClick={()=>handlelikeandcomment()}>
                        {temp.likeCount.includes(authData.username)===true?(
                            <img className={` ${load===true?"animate-spin":"animate-none"} h-7 w-7 `} src={liked} alt="" />
                        ):
                        (
                            <img className={`h-7 w-7 ${load===true?"animate-spin":"animate-none"}`} src={like} alt="" />
                        )}
                    </button>
                </div>
                <div onClick={()=>navigate(`/Post/${item._id}`)} className='flex gap-2 justify-center items-start  '>
                    <span className='mt-1'>{item.Comments.length}</span>
                    <button>
                        <img className='h-7 w-7' src={comment} alt="" />
                    </button>
                </div>
            </div>
            <div className='flex justify-center items-start'>
                <button onClick={()=>handleSaveButton()}>
                    {authData.savedposts.includes(item._id)===true?(
                        <img className={`h-7 w-7 ${load2===true?"animate-spin":"animate-none"}`} src={saved} alt="" />

                    ):(
                        <img className={`h-7 w-7 ${load2===true?"animate-spin":"animate-none"}`} src={save} alt="" />

                    )}

                </button>
            </div>
        </div>
    </div>
  )
}

export default PostCard