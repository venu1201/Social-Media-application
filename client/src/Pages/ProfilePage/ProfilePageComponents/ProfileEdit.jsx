import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { avatar } from '../../../assets';
import { client, urlFor } from '../../../Client';
import { useNavigate } from 'react-router-dom';
import { getuserbyId } from '../../../api';
import LoadingSpinner from '../../../components/Spinner/Spinner';
import { updateUser } from '../../../actions/user';
import { ToastContainer, toast } from 'react-toastify';
const ProfileEdit = () => {
    const user = useSelector((state) => state.authData);
    const [formdata,setformdata]=useState(null);
    const [imgageloading,setimageloading]=useState(false);
    const [loading,setloading]=useState(false);
    useEffect(() => {
        const fetchUser = async () => {  
            try {
                const response = await getuserbyId(user.username);
                console.log(response.data.result);
                setformdata(response.data.result);
            } catch (error) {
                console.log(error)
              } finally {

            }
        };
    
        fetchUser();
    }, []);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        setimageloading(true);
        if (file) {

            const imageasset = await client.assets.upload('image', file, { contentType: file.type, filename: file.name })
                .catch((err) => {
                    console.log('Upload failed', err.message);
                });
            const image=await urlFor({ _type: 'image', asset: { _type: '_reference', _ref: imageasset._id } }).url();
            setformdata({...formdata,profilepicture:image});
            setimageloading(false);
        }
        else {
            setimageloading(false);
        }
    };



    const handlechange = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    }
    const handlesubmit = (e) => {
        e.preventDefault();
        setloading(true);
        if(imgageloading===true)
        {
            return;
        }
        dispatch(updateUser(formdata,setformdata,setloading,ToastFunction));
        
    }
    const ToastFunction=(message)=>{
        toast.success(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
            theme: "colored",
        });
    }
    return (
        <div className='h-full  overflow-scroll flex justify-center  w-full font-poppins '>
            <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
            {formdata===null?(
                 <div className=' w-[95%] pt-[40px]  flex flex-col'>
                 <h3 className='text-[40px] flex gap-3'>
                     <button onClick={() => navigate(`/Profile/${user.username}`)} className='text-[40px] cursor-pointer'>{"<"}</button>
                     <span>Edit Profile</span>
                 </h3>
                 <div className='h-full pt-5 gap-6 flex flex-col w-full '>
                         <div className="flex gap-5  h-[100px] w-full">
                            <div className="h-[100px] bg-blue-900 animate-pulse w-[100px] rounded-full"></div>
                            
                         </div>
                         <div className='flex h-[60px] bg-blue-900 animate-pulse flex-col gap-2 w-full'>
                             
                         </div>
                         <div className='flex h-[60px] bg-blue-900 animate-pulse flex-col gap-2 w-full'>
                             
                         </div>
                         <div className='flex h-[60px] bg-blue-900 animate-pulse flex-col gap-2 w-full'>
                             
                         </div>
                         <div className='flex h-[100px] bg-blue-900 animate-pulse flex-col gap-2 w-full'>
                             
                         </div>
                         
                         
                         
                        
                 </div>
             </div>
            ):(

           
            <div className=' w-[95%]  pt-[40px]  flex flex-col'>
                <h3 className='text-[40px] flex gap-3'>
                    <button onClick={() => navigate(`/Profile/${user.username}`)} className='text-[40px]'>{"<"}</button>
                    <span>Edit Profile</span>
                </h3>
                <div className='h-full w-full '>
                    <form className="h-full w-full pt-5 gap-6 flex flex-col" onSubmit={handlesubmit}>
                        <div htmlFor="imageInput" className="h-[100px] w-full">
                            {imgageloading===false?(
                                <label className='h-full w-full flex gap-5' htmlFor="imageInput">
                                <img className="h-[100px] w-[100px] rounded-full object-fill  shadow-sm z-[1000]" src={formdata.profilepicture || avatar} alt="" />
                                <div className="h-full text-[20px] flex justify-center items-center">
                                    <span>Change Profile picture</span>
                                </div>
                            </label>
                            ):(
                                <label className='h-full w-full flex gap-5'>
                                    <div className='h-[100px] bg-blue-900 animate-pulse flex justify-center items-center w-[100px] rounded-full '>
                                        <LoadingSpinner/>
                                    </div>
                                <div className="h-full text-[20px] flex justify-center items-center">
                                    <span>Change Profile picture</span>
                                </div>
                                </label>
                            )}
                            
                           

                            <input
                                type="file"
                                id="imageInput"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='text-[25px]'>
                                First Name
                            </div>
                            <div className='h-[45px]'>
                                <input onChange={handlechange} name='firstname' value={formdata.firstname} className='xsmall:w-[600px] w-[98%] text-[25px] text-black  outline-none border-none px-2 h-full' type="text" />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='text-[25px]'>
                                Last Name
                            </div>
                            <div className='h-[45px]'>
                                <input onChange={handlechange} name='lastname' value={formdata.lastname} className='xsmall:w-[600px] w-[98%] text-[25px] text-black  outline-none border-none px-2 h-full' type="text" />
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='text-[25px]'>
                                USERNAME
                            </div>
                            <div className='h-[40px]'>
                                <span className='xsmall:w-[600px] w-[98%] text-[25px] flex items-center text-slate-300 px-2 h-full'>
                                    {"@"+formdata.username}
                                </span>
                                {/* <input name='username' value={formdata.username} className='w-[660px] text-[25px] text-black  outline-none border-none px-2 h-full' type="text" /> */}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 w-full'>
                            <div className='text-[25px]'>
                                Email
                            </div>
                            <div className='h-[45px]'>
                                <input onChange={handlechange} name='email' value={formdata.email} className='xsmall:w-[600px] w-[98%] text-[25px] text-black  outline-none border-none px-2 h-full' type="text" />
                            </div>
                        </div>
                        <div className='flex  flex-col gap-2 w-full'>
                            <div className='text-[25px]'>
                                Bio
                            </div>
                            <div className='h-[80px]'>
                                <textarea name={'bio'} value={formdata.bio} onChange={handlechange} placeholder='Write Some Thing About You' className='xsmall:w-[600px] w-[98%] p-2 text-black text-[25px] outline-none border-none h-full resize-none' />
                            </div>
                        </div>
                        <div className='xsmall:w-[600px] w-[98%] flex justify-end'>
                            <button
                                type="submit"
                                className={`text-[20px] ${(imgageloading === false && loading=== false) ? "cursor-pointer bg-gradient " : "cursor-wait bg-orange-300 border-2 "} rounded-lg w-[130px]  font-bold text-white  h-[60px]`}
                            >
                                {(imgageloading === false && loading===false) ? (
                                    <span>
                                        Update
                                    </span>

                                ) : (
                                    <span>
                                        Wait...
                                    </span>
                                )}

                            </button>

                        </div>
                        <div className='min-h-[20px]'>
                                    
                        </div>
                        {/* <div className=' text-black w-[80%] mt-4 flex justify-center  items-center flex-col'>
                            <div className='w-full text-[20px] text-dimWhite gap-4 h-[35px] mt-2 flex  items-center'>
                                <div>Username :</div>
                                <div>
                                    {localdata?.username}
                                </div>
                            </div>
                            <div className='w-full text-[20px] mb-1 text-dimWhite gap-4 h-[35px] flex items-center'>
                                <div>Email :</div>
                                <div>
                                    {localdata?.email}
                                </div>
                            </div>
                            <div className='w-full gap-4 h-[45px] mt-2 flex justify-center items-center'>
                                <input onChange={handlechange} value={editdata?.firstname} name='firstname' placeholder='FirstName' className='w-full text-[18px]  outline-none border-none px-4 h-full' type="text" />
                                <input onChange={handlechange} value={editdata?.lastname} name='lastname' placeholder='LastName' className='w-full text-[18px]  outline-none border-none px-4 h-full' type="text" />

                            </div>
                            <div className='w-full mt-4 h-[100px]'>
                                <textarea onChange={handlechange} value={editdata?.bio} name='bio' placeholder='Write Some Thing About You' className='w-full text-[18px] outline-none border-none p-4 h-full resize-none' />
                            </div>

                        </div> */}


                    </form>
                </div>
            </div>
            )}
        </div>
    )
}

export default ProfileEdit